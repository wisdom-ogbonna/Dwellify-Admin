import { useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import QuickStats from "../Components/QuickStats";
import Footer from "../Components/Footer";
import { BarPlotter } from "../Components/BarCharts";
import { PiePlotter } from "../Components/PieCharts";

const Dashboard = () => {

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
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans antialiased">
      <Sidebar />

      <main className="transition-all duration-300 pt-14 md:ml-64 p-4 md:p-8 lg:p-12">
        <div className="max-w-350 mx-auto">
          <Header 
            flag="Live System"
            flagSubtitle={true}
            title="Admin Panel"
            mission="User & Resources Management"
            subMission="Data Control Centre"
          />

          <section className="mb-10">
            <QuickStats quikStats={stats} />
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-6 md:p-8 rounded-4xl border border-zinc-200 shadow-sm transition-hover hover:shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-black rounded-full" />
                <h3 className="font-bold uppercase tracking-tight text-sm text-zinc-400">
                  Revenue Growth
                </h3>
              </div>
              <BarPlotter />
            </div>
            <div className="bg-white p-6 md:p-8 rounded-4xl border border-zinc-200 shadow-sm transition-hover hover:shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-black rounded-full" />
                <h3 className="font-bold uppercase tracking-tight text-sm text-zinc-400">
                  User Distribution
                </h3>
              </div>
              <PiePlotter />
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
