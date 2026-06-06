import { useState, useEffect, useMemo } from "react";
import { User2, Activity, UserMinus } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import KpiCards from "../Components/KpiCards";
import SearchInput from "../Components/SearchInput";
import DataTable from "../Components/DataTable";
import ActionModal from "../Components/ActionModal";
import Footer from "../Components/Footer";
import { agentService } from "../services/agentService";
import { useNotifications } from "../../context/NotificationContext";

const VerificationRequests = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [syncTime, setSyncTime] = useState("--:--:--");
  const [modal, setModal] = useState({ isOpen: false, type: "", item: null });

  const { setPendingCount } = useNotifications();

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const res = await agentService.getAllAgents();

      const pendingRequests = res.filter(
        (agent) =>
          agent.agentStatus?.toLowerCase() === "pending" ||
          agent.agentStatus?.toLowerCase() === "submitted",
      );

      setAgents(pendingRequests);
      setPendingCount(pendingRequests.length);

      setSyncTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    } catch (error) {
      console.error("Failed to load requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = useMemo(() => {
    if (!searchTerm.trim()) return agents;
    const lowerSearch = searchTerm.toLowerCase();
    return agents.filter((agent) => {
      const name = agent.agentDetails?.name || "";
      const email = agent.agentDetails?.email || "";
      const id = agent.uid || "";
      return (
        name.toLowerCase().includes(lowerSearch) ||
        email.toLowerCase().includes(lowerSearch) ||
        id.toLowerCase().includes(lowerSearch)
      );
    });
  }, [agents, searchTerm]);

  const kpiInfo = useMemo(() => {
    const total = agents.length;
    return [
      {
        label: "Pending Requests",
        val: total.toLocaleString(),
        icon: <User2 size={20} />,
        color: "bg-white text-amber-500",
      },
    ];
  }, [agents]);

  const handleAction = async (item, type) => {
    try {
      const baseUrl = `https://dwellify-backend-bq39.onrender.com/api/admin/agents/${item.uid}`;
      if (type === "suspend") {
        await fetch(`${baseUrl}/suspend`, { method: "PUT" });
      } else if (type === "approve") {
        await fetch(`${baseUrl}/approve`, { method: "PUT" });
      } else if (type === "delete") {
        await fetch(`${baseUrl}/delete`, { method: "DELETE" });
      }

      await loadAgents();
    } catch (err) {
      console.error("Action error:", err);
    }
    setModal({ isOpen: false, type: "", item: null });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans antialiased">
      <Sidebar />

      <main className="transition-all duration-300 md:ml-64 p-4 pt-24 md:p-8 lg:p-12 md:pt-14">
        <div className="max-w-350 mx-auto">
          <Header
            flag="REQUESTS"
            flagSubtitle="ACTION REQUIRED"
            title="Verification"
            mission="Review onboarding submissions"
            subMission="Gatekeeper controls"
            syncTime={syncTime}
            fetchData={loadAgents}
          />

          <div className="w-full">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          <section className="mb-10">
            <KpiCards kpiInfo={kpiInfo} />
          </section>

          <section className="bg-white rounded-4xl border border-zinc-200 shadow-sm overflow-hidden transition-hover hover:shadow-md">
            <div className="p-1">
              {loading ? (
                <div className="p-20 text-center font-black animate-pulse">
                  FETCHING REQUESTS...
                </div>
              ) : (
                <DataTable
                  data={filteredAgents}
                  syncTime={syncTime}
                  onSuspend={(item) =>
                    setModal({ isOpen: true, type: "suspend", item })
                  }
                  onApprove={(item) =>
                    setModal({ isOpen: true, type: "approve", item })
                  }
                  onDelete={(item) =>
                    setModal({ isOpen: true, type: "delete", item })
                  }
                />
              )}
            </div>
          </section>

          <div className="mt-20">
            <Footer />
          </div>
        </div>

        <ActionModal
          key={modal.item?.uid || "none"}
          isOpen={modal.isOpen}
          type={modal.type}
          targetItem={modal.item}
          titleText={modal.item?.agentDetails?.name}
          onClose={() => setModal({ ...modal, isOpen: false })}
          onConfirm={() => handleAction(modal.item, modal.type)}
        />
      </main>
    </div>
  );
};

export default VerificationRequests;
