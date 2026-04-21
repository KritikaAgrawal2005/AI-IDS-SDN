from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import MAIN_DISPATCHER, CONFIG_DISPATCHER
from ryu.controller.handler import set_ev_cls
from ryu.ofproto import ofproto_v1_3
from ryu.lib.packet import packet, ethernet
from ryu.lib import hub

import subprocess
import json
import random


class SDNIDS(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    def __init__(self, *args, **kwargs):
        super(SDNIDS, self).__init__(*args, **kwargs)
        self.mac_to_port = {}
        self.datapaths = {}
        self.monitor_thread = hub.spawn(self._monitor)

    # 🔴 TABLE MISS RULE
    @set_ev_cls(ofp_event.EventOFPSwitchFeatures, CONFIG_DISPATCHER)
    def switch_features_handler(self, ev):
        datapath = ev.msg.datapath
        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser

        self.datapaths[datapath.id] = datapath

        match = parser.OFPMatch()
        actions = [parser.OFPActionOutput(ofproto.OFPP_CONTROLLER,
                                         ofproto.OFPCML_NO_BUFFER)]

        inst = [parser.OFPInstructionActions(ofproto.OFPIT_APPLY_ACTIONS, actions)]

        mod = parser.OFPFlowMod(
            datapath=datapath,
            priority=0,
            match=match,
            instructions=inst
        )

        datapath.send_msg(mod)

    # 🔵 BASIC SWITCH (L2 LEARNING)
    @set_ev_cls(ofp_event.EventOFPPacketIn, MAIN_DISPATCHER)
    def packet_in_handler(self, ev):
        msg = ev.msg
        datapath = msg.datapath
        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser

        pkt = packet.Packet(msg.data)
        eth = pkt.get_protocol(ethernet.ethernet)

        dpid = datapath.id
        self.mac_to_port.setdefault(dpid, {})

        dst = eth.dst
        src = eth.src
        in_port = msg.match['in_port']

        self.mac_to_port[dpid][src] = in_port

        if dst in self.mac_to_port[dpid]:
            out_port = self.mac_to_port[dpid][dst]
        else:
            out_port = ofproto.OFPP_FLOOD

        actions = [parser.OFPActionOutput(out_port)]

        data = None
        if msg.buffer_id == ofproto.OFP_NO_BUFFER:
            data = msg.data

        out = parser.OFPPacketOut(
            datapath=datapath,
            buffer_id=msg.buffer_id,
            in_port=in_port,
            actions=actions,
            data=data
        )
        datapath.send_msg(out)

    # 🔵 MONITOR FLOWS
    def _monitor(self):
        while True:
            for dp in self.datapaths.values():
                self._request_stats(dp)
            hub.sleep(5)

    def _request_stats(self, datapath):
        parser = datapath.ofproto_parser
        req = parser.OFPFlowStatsRequest(datapath)
        datapath.send_msg(req)

    # 🔴 IDS LOGIC
    @set_ev_cls(ofp_event.EventOFPFlowStatsReply, MAIN_DISPATCHER)
    def _flow_stats_reply_handler(self, ev):
        for stat in ev.msg.body:

            if stat.packet_count == 0:
                continue

            duration = stat.duration_sec

            # 🔥 ADD VARIATION
            src_bytes = stat.byte_count + random.randint(-800, 800)
            if src_bytes < 50:
                src_bytes = 50

            dst_bytes = int(src_bytes / 2)

            data = {
                "duration": duration,
                "ip_proto": random.choice([1, 6, 17]),
                "src_bytes": src_bytes,
                "dst_bytes": dst_bytes
            }

            try:
                subprocess.Popen([
                    "curl",
                    "-X", "POST",
                    "http://localhost:5000/predict",
                    "-H", "Content-Type: application/json",
                    "-d", json.dumps(data)
                ])
            except:
                pass
