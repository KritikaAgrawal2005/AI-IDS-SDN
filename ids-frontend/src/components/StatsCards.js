import { useMemo } from "react";

function StatsCards({ logs }) {

  // ✅ optimize calculations (prevents stale values)
  const { total, normal, suspicious } = useMemo(() => {
    const total = logs.length;

    const normal = logs.filter(
      l => l.prediction === "NORMAL"
    ).length;

    const suspicious = logs.filter(
      l => l.prediction === "SUSPICIOUS"
    ).length;

    return { total, normal, suspicious };
  }, [logs]);

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      marginTop: "20px"
    }}>

      {/* Total */}
      <div style={{
        flex: 1,
        padding: "20px",
        border: "1px solid #38bdf8",
        borderRadius: "12px",
        textAlign: "center",
        background: "#020617"
      }}>
        <h3 style={{ color: "#38bdf8" }}>Total Flows</h3>
        <h1>{total}</h1>
      </div>

      {/* Normal */}
      <div style={{
        flex: 1,
        padding: "20px",
        border: "1px solid #22c55e",
        borderRadius: "12px",
        textAlign: "center",
        background: "#020617"
      }}>
        <h3 style={{ color: "#22c55e" }}>Normal Flows</h3>
        <h1>{normal}</h1>
      </div>

      {/* Suspicious */}
      <div style={{
        flex: 1,
        padding: "20px",
        border: "1px solid #ef4444",
        borderRadius: "12px",
        textAlign: "center",
        background: "#020617"
      }}>
        <h3 style={{ color: "#ef4444" }}>Suspicious Flows</h3>
        <h1>{suspicious}</h1>
      </div>

    </div>
  );
}

export default StatsCards;
