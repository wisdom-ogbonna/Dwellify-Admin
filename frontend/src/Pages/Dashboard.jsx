import { useState } from "react";
import { RefreshCw } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import QuickStats from "../Components/QuickStats";
import Footer from "../Components/Footer";
import { useReload } from "../hooks/useReload";
import { fetchStatsData } from "../services/fetchStats";
import { BarPlotter } from "../Components/BarCharts";
import { PiePlotter } from "../Components/PieCharts";

const Dashboard = () => {
  const { isLoading, reload } = useReload(fetchStatsData);

  const [stats] = useState([
    { label: "Total Revenue", val: "N1,240,000" },
    { label: "Net Profit", val: "N920,000" },
    { label: "Agents", val: "80.2k" },
    { label: "Clients", val: "340k" },
    { label: "Total Users", val: "840k" },
    { label: "Properties", val: "1.2k" },
    { label: "Android Users", val: "120k" },
    { label: "iOS Users", val: "220k" },
    { label: "Web Users", val: "500k" },
    { label: "New Signups", val: "1.5k" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 relative text-black antialiased p-4 md:p-0">
      <Sidebar />

      <main className="md:ml-64 p-8 lg:p-12">
        <header className="flex justify-between items-end mb-2 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight">
              ADMIN PANEL
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              User & Resources Management [Data Control Centre].
            </p>
          </div>

          <button
            onClick={reload}
            disabled={isLoading}
            className={`h-14 w-14 border-2 border-black flex items-center justify-center rounded-2xl shadow-inner bg-white transition-all
              ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md hover:bg-gray-100 active:scale-95"}`}
          >
            <span className="font-bold text-[10px] text-center leading-none">
              <RefreshCw
                size={16}
                className={`inline mb-1 ${isLoading ? "animate-spin text-zinc-500" : ""}`}
              />
            </span>
          </button>
        </header>

        <QuickStats quikStats={stats} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-12">
          <BarPlotter />
          <PiePlotter />
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
