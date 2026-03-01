import React, { useState } from "react";
import {
  Copy,
  ExternalLink,
  Globe,
  Package,
  Settings,
  Store,
  LayoutDashboard,
  Plus,
  RefreshCw,
  User,
  User2,
} from "lucide-react";
import Sidebar from "../Components/Sidebar";
import QuickStats from "../Components/QuickStats";
import Footer from "../Components/Footer";

const SellerProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stats] = useState([
    { label: "Total Revenue", val: "N1,240,000" },
    { label: "Net Profit", val: "N920,000" },
    { label: "Agents", val: "80.2k" },
    { label: "Clients", val: "340k" },
  ]);

  

  const reload = () => {
    setIsLoading(true);
    if (isLoading) {
      document.querySelectorAll(".reload-icon").forEach((el) => {
        el.classList.add("animate-spin");
      });
    }
    setTimeout(() => {
      setIsLoading(false);
      document.querySelectorAll(".reload-icon").forEach((el) => {
        el.classList.remove("animate-spin");
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative text-black antialiased p-4 md:p-0">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
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
            className="h-14 w-14 border-2 border-black flex items-center justify-center rounded-2xl shadow-inner bg-white cursor-pointer hover:shadow-md transition-shadow hover:bg-gray-100"
          >
            <span className="font-bold text-[10px] text-center leading-none">
              <RefreshCw size={16} className="inline mb-1 reload-icon" />
            </span>
          </button>
        </header>

        <QuickStats quikStats={stats}  />
        
        <Footer />
        
      </main>
    </div>
  );
};

export default SellerProfile;
