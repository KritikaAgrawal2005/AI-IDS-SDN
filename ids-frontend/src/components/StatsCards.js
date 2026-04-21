function StatsCards({ logs }) {
  const total = logs.length;
  const attacks = logs.filter(l => l.prediction === "ATTACK").length;
  const normal = total - attacks;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px",
      marginTop: "20px"
    }}>
      <Card title="Total Packets" value={total} color="#38bdf8" />
      <Card title="Normal Traffic" value={normal} color="#4ade80" />
      <Card title="Attacks Detected" value={attacks} color="#f87171" />
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div style={{
      background: "#020617",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
      border: `1px solid ${color}`
    }}>
      <h3 style={{ color }}>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

export default StatsCards;
