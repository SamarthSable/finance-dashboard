import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";

// 📈 Line Chart: Optimized for Dark Mode & Responsiveness
export const LineChartComponent = ({ data }) => {
  // Handle empty data to prevent Recharts errors
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-5 text-muted small">
        No trend data available
      </div>
    );
  }

  return (
    <div style={{ width: "100%", minWidth: 0 }}>
      {/* aspect={2} maintains a 2:1 ratio, solving the -1 height error */}
      <ResponsiveContainer width="100%" height="100%" aspect={2}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            itemStyle={{ color: "#3b82f6" }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#0f172a" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// 📊 Pie Chart: Modern Donut Design// 📊 Pie Chart: Final Responsive Version
export const PieChartComponent = ({ data }) => {
  const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-5 text-muted small">No category data</div>
    );
  }

  return (
    /* We remove the aspect and use a fixed height for the container */
    <div style={{ width: "100%", height: "250px", minWidth: 0 }}>
      <ResponsiveContainer width="99%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="65%"
            outerRadius="90%"
            paddingAngle={5}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              value="Expenses"
              position="center"
              fill="#94a3b8"
              style={{ fontSize: "12px", fontWeight: "600" }}
            />
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
