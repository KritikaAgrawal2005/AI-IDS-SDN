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
      background: "#0f172a",
      minHeight: "100vh",
      color: "white",
      padding: "20px"
    }}>
      <h1>🛡 AI-Powered Intrusion Detection System</h1>
      <p>Live network traffic analysis</p>

      <pre style={{
        background: "#020617",
        padding: "15px",
        borderRadius: "8px",
        marginTop: "20px",
        maxHeight: "400px",
        overflow: "auto"
      }}>
        {JSON.stringify(logs, null, 2)}
      </pre>
    </div>
  );
}

export default Dashboard;
