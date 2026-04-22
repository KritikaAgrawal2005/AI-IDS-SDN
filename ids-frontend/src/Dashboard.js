import TimelineChart from "./components/TimelineChart";
import AttackAlert from "./components/AttackAlert";
import TrafficChart from "./components/TrafficChart";
import StatsCards from "./components/StatsCards";

import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [logs, setLogs] = useState([]);

  // 🔐 Protect dashboard
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) window.location.href = "/";
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/logs");
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 1000);
    return () => clearInterval(interval);
  }, []);

  // 📄 Export CSV
  const exportCSV = () => {
    if (logs.length === 0) return;

    const headers = ["Time", "Protocol", "Traffic Volume", "Classification"];

    const rows = logs.map(log => [
      new Date(log.time).toLocaleString(),
      log.ip_proto,
      log.frame_len,
      log.prediction
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ids_logs.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{
      background: "radial-gradient(circle at top, #020617, #000)",
      minHeight: "100vh",
      color: "#e5e7eb",
      padding: "30px",
      fontFamily: "Inter, system-ui"
    }}>

      {/* 🔥 TOP BAR (FIXED) */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>

        {/* Title */}
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "800" }}>
            🛡 AI-Powered Intrusion Detection System
          </h1>
          <p style={{ color: "#94a3b8" }}>
            Real-time flow-based network monitoring & threat detection
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>

          <button
            onClick={exportCSV}
            style={{
              padding: "8px 16px",
              background: "#22c55e",
              border: "none",
              borderRadius: "8px",
              color: "#020617",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Export Logs
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/";
            }}
            style={{
              padding: "8px 16px",
              background: "#ef4444",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Logout
          </button>

        </div>
      </div>

      {/* Alert */}
      <AttackAlert logs={logs} />

      {/* Stats */}
      <StatsCards logs={logs} />

      {/* Charts */}
      <div style={{
        display: "grid",
        gap: "30px",
        marginTop: "30px"
      }}>
        <TrafficChart logs={logs} />
        <TimelineChart logs={logs} />
      </div>

      {/* Logs */}
      <div style={{
        marginTop: "40px",
        background: "#020617",
        padding: "20px",
        borderRadius: "12px"
      }}>
        <h3>📄 Real-Time Flow Analysis Logs</h3>
        <table width="100%" style={{ borderCollapse: "collapse" }}>
  <thead>
    <tr style={{ color: "#94a3b8", textAlign: "left" }}>
      <th style={{ padding: "10px" }}>Time</th>
      <th style={{ padding: "10px" }}>Protocol</th>
      <th style={{ padding: "10px" }}>Traffic Volume</th>
      <th style={{ padding: "10px" }}>Classification</th>
    </tr>
  </thead>

  <tbody>
    {logs.slice(0, 8).map((log, i) => (
      <tr key={i}
        style={{
          background: log.prediction === "SUSPICIOUS" ? "#450a0a" : "#022c22",
          color: log.prediction === "SUSPICIOUS" ? "#fecaca" : "#bbf7d0"
        }}>
        <td style={{ padding: "10px" }}>
          {new Date(log.time).toLocaleTimeString()}
        </td>
        <td style={{ padding: "10px" }}>{log.ip_proto}</td>
        <td style={{ padding: "10px" }}>{log.frame_len}</td>
        <td style={{ padding: "10px", fontWeight: "bold" }}>
          {log.prediction}
        </td>
      </tr>
    ))}
  </tbody>
</table>
           
      </div>

    </div>
  );
}

export default Dashboard;
