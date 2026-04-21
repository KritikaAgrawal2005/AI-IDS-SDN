import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function TimelineChart({ logs }) {
  // group logs by minute
  const grouped = {};

  logs.forEach(log => {
    const time = new Date(log.time).toLocaleTimeString();
    if (!grouped[time]) {
      grouped[time] = { time, normal: 0, attack: 0 };
    }
    if (log.prediction === "ATTACK") {
      grouped[time].attack += 1;
    } else {
      grouped[time].normal += 1;
    }
  });

  const data = Object.values(grouped).slice(-10); // last 10 points

  return (
    <div style={{
      background: "#020617",
      padding: "20px",
      borderRadius: "12px",
      marginTop: "20px"
    }}>
      <h3>📈 Traffic Timeline</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="normal" stroke="#22c55e" />
          <Line type="monotone" dataKey="attack" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
