export default function AttackAlert({ logs }) {
  const hasAttack = logs.some(l => l.prediction === "ATTACK");

  if (!hasAttack) return null;

  return (
    <div style={{
      background: "linear-gradient(90deg, #7f1d1d, #dc2626)",
      padding: "16px",
      borderRadius: "10px",
      marginTop: "20px",
      animation: "pulse 1s infinite",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "18px",
      color: "white"
    }}>
      🚨 INTRUSION DETECTED — IMMEDIATE ACTION REQUIRED 🚨
    </div>
  );
}
