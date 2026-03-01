import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const propertyData = [
  { name: "Hotels", value: 45 },
  { name: "Shortlets", value: 35 },
  { name: "Apartments", value: 20 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

export const PiePlotter = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 w-full">
    <h3 className="text-gray-500 text-sm font-medium mb-2">Property Types</h3>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={propertyData}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {propertyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
