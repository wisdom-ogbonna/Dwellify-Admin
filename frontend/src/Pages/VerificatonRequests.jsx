import { useState, useEffect } from "react";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

import KpiCards from "../Components/KpiCards";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import SearchInput from "../Components/SearchInput";
import RequestTable from "../Components/RequestTable";
import AgentRequest from "../Components/AgentRequest";

import { agentService } from "../services/agentService";

const VerificationRequests = () => {
  const [data, setData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPendingRequests();
  }, []);

  const loadPendingRequests = async () => {
    setLoading(true);
    try {
      const res = await agentService.getAllAgents();
      const pending = res.filter(
        (agent) => agent.status?.toLowerCase() === "pending",
      );
      setData(pending);
    } catch (error) {
      console.error("Failed to load requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPanel = (agent) => {
    setSelectedAgent(agent);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedAgent(null), 500);
  };

  const handleApprove = async (agent) => {
    console.log("Verifying Agent:", agent.name);
    handleClosePanel();
    await loadPendingRequests();
  };

  const handleDeny = async (agent) => {
    console.log("Rejecting Agent:", agent.name);
    handleClosePanel();
    await loadPendingRequests();
  };

  const [kpiInfo] = useState([
    {
      label: "Total Requests",
      val: "12.2k",
      icon: <Clock size={20} />,
      color: "bg-white text-zinc-900",
    },
    {
      label: "Total Approved",
      val: "3.2k",
      icon: <CheckCircle2 size={20} />,
      color: "bg-white text-emerald-500",
    },
    {
      label: "Total Rejected",
      val: "1.1k",
      icon: <AlertCircle size={20} />,
      color: "bg-white text-rose-500",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans antialiased">
      <Sidebar />

      <main className="transition-all duration-300 md:ml-64 p-4 pt-24 md:p-8 lg:p-12 md:pt-14">
        <div className="max-w-350 mx-auto">
          {/* Header Section */}
          <Header
            flag="STAFF"
            flagSubtitle={"VERIFICATION REQUESTS"}
            title="Verification"
            mission="Audit and manage new agent applications"
            subMission="Identity & KYC verification"
          />

              <SearchInput placeholder="Search by name or email..." />
              <KpiCards kpiInfo={kpiInfo} />
            
          
          <section
            className={`mb-20 transition-opacity duration-300 ${loading ? "opacity-50" : "opacity-100"}`}
          >
            <RequestTable
              data={data}
              onApprove={handleOpenPanel}
              onDeny={handleOpenPanel}
            />
          </section>

          <Footer />
        </div>

        <AgentRequest
          agent={selectedAgent}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          onApprove={handleApprove}
          onDeny={handleDeny}
        />
      </main>
    </div>
  );
};

export default VerificationRequests;
