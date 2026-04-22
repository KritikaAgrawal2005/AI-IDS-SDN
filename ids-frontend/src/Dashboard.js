import TimelineChart from "./components/TimelineChart";
import AttackAlert from "./components/AttackAlert";
import TrafficChart from "./components/TrafficChart";

import StatsCards from "./components/StatsCards";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await axios.get("http://localhost:5000/logs");
    setLogs(res.data.reverse());
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div style={{
    background: "radial-gradient(circle at top, #020617, #000)",
    minHeight: "100vh",
    color: "#e5e7eb",
    padding: "30px",
    fontFamily: "Inter, system-ui"
  }}>
    
    {/* Header */}
    <div style={{ marginBottom: "30px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "800" }}>
        🛡 AI-Powered Intrusion Detection System
      </h1>
      <p style={{ color: "#94a3b8" }}>
        Real-time network traffic monitoring & threat detection
      </p>
    </div>

    {/* Alert */}
    <AttackAlert logs={logs} />

    {/* Stats */}
    <StatsCards logs={logs} />

    {/* Charts Section */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "30px",
      marginTop: "30px"
    }}>
      <TrafficChart logs={logs} />
      <TimelineChart logs={logs} />
    </div>

    {/* Logs Table */}
    <div style={{
      marginTop: "40px",
      background: "#020617",
      padding: "20px",
      borderRadius: "12px"
    }}>
      <h3 style={{ marginBottom: "15px" }}>📄 Live Traffic Logs</h3>

      <table width="100%" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ color: "#94a3b8", textAlign: "left" }}>
            <th>Time</th>
            <th>Protocol</th>
            <th>Frame Length</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          {logs.slice(0, 8).map((log, i) => (
            <tr key={i}
              style={{
                background: log.prediction === "ATTACK" ? "#450a0a" : "#022c22",
                color: log.prediction === "ATTACK" ? "#fecaca" : "#bbf7d0"
              }}>
              <td>{new Date(log.time).toLocaleTimeString()}</td>
              <td>{log.ip_proto}</td>
              <td>{log.frame_len}</td>
              <td style={{ fontWeight: "bold" }}>{log.prediction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
);
}

export default Dashboard;
