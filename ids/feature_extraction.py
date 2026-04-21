from scrapy.all import rdpcap
import pandas as pd
packets = rdpcap("traffic.pcap")
data = []
for pkt in packets:
    if pkt.haslayer("IP"):
        data.append({
            "src_ip": pkt["IP"].src,
            "dst_ip": pkt["IP"].dst,
            "protocol":pkt["IP"].proto,
            "packet_length": len(pkt)
        })
df = pd.DataFrame(data)
df.to_csv("features.csv", index=False)
print(" Features extraction completed successfully!!!!!")
print(df.head())
