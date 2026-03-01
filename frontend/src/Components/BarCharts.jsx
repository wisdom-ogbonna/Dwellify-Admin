import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import DateUtils from "../utils/DateFormats";

const data = [
  { name: "Jan", total: 1200000 },
  { name: "Feb", total: 2100000 },
  { name: "Mar", total: 800000 },
  { name: "Apr", total: 1600000 },
];

export const BarPlotter = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 w-full">
    <h3 className="text-gray-500 text-sm font-medium mb-4">
      {DateUtils.getCurrentYear()} Monthly Revenue (₦)
    </h3>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9ca3af", fontSize: 12 }}
        />
        <YAxis hide />
        <Tooltip
          cursor={{ fill: "#f9fafb" }}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={40}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 1 ? "#4F46E5" : "#E5E7EB"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);
