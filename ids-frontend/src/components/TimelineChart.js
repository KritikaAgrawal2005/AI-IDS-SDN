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

  const grouped = {};

  logs.forEach(log => {
    const date = new Date(log.time);

    // ✅ use timestamp
    const time = date.getTime();

    if (!grouped[time]) {
      grouped[time] = {
        time,
        normal: 0,
        suspicious: 0
      };
    }

    if (log.prediction === "SUSPICIOUS") {
      grouped[time].suspicious += 1;
    } else {
      grouped[time].normal += 1;
    }
  });

  const data = Object.values(grouped)
    .sort((a, b) => a.time - b.time)   // ✅ correct sorting
    .slice(-10);

  return (
    <div style={{
      background: "#020617",
      padding: "20px",
      borderRadius: "12px",
      marginTop: "20px"
    }}>
      <h3>📈 Traffic Behavior Over Time</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" />

          <XAxis
            dataKey="time"   // ✅ FIXED (no space)
            tickFormatter={(time) =>
              new Date(time).toLocaleTimeString()
            }
          />

          <YAxis />
          <Tooltip
            labelFormatter={(time) =>
              new Date(time).toLocaleTimeString()
            }
          />

          <Line
            type="monotone"
            dataKey="normal"
            stroke="#22c55e"
            strokeWidth={2}
          />

          <Line
            type="monotone"
            dataKey="suspicious"
            stroke="#ef4444"
            strokeWidth={2}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
