function LogsTable({ logs }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📡 Live Traffic Logs</h2>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
        background: "#020617",
        borderRadius: "8px",
        overflow: "hidden"
      }}>
        <thead>
          <tr>
            <th style={th}>Time</th>
            <th style={th}>Protocol</th>
            <th style={th}>Frame Length</th>
            <th style={th}>Prediction</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log, index) => (
            <tr
              key={index}
              style={{
                background:
                  log.prediction === "ATTACK" ? "#7f1d1d" : "#022c22",
                color: "white"
              }}
            >
              <td style={td}>{new Date(log.time).toLocaleTimeString()}</td>
              <td style={td}>{log.ip_proto}</td>
              <td style={td}>{log.frame_len}</td>
              <td style={{
                ...td,
                fontWeight: "bold",
                color: log.prediction === "ATTACK" ? "#fecaca" : "#86efac"
              }}>
                {log.prediction}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #334155"
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #334155"
};

export default LogsTable;
