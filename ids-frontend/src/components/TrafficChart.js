import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // green, red

export default function TrafficChart({ logs }) {
  const normal = logs.filter(l => l.prediction === "NORMAL").length;
  const attack = logs.length - normal;

  const data = [
    { name: "Normal", value: normal },
    { name: "Attack", value: attack }
  ];

  return (
    <div style={{
      background: "#020617",
      padding: "20px",
      borderRadius: "12px",
      marginTop: "20px"
    }}>
      <h3>📊 Traffic Distribution</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
