import { useState, useEffect, useMemo } from "react";
import { User2, Activity, UserMinus } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import KpiCards from "../Components/KpiCards";
import SearchInput from "../Components/SearchInput";
import DataTable from "../Components/DataTable";
import ActionModal from "../Components/ActionModal";
import AddButton from "../Components/AddButton";
import Footer from "../Components/Footer";
import { agentService } from "../services/agentService";

const Agents = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, type: "", item: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const res = await agentService.getAllAgents();
      const notPending = res.filter(
        (agent) => agent.agentStatus?.toLowerCase() !== "pending",
      );
      setData(notPending);
    } catch (error) {
      console.error("Failed to load agents:", error);
    } finally {
      setLoading(false);
    }
  };

  const kpiInfo = useMemo(() => {
    const total = data.length;
    const active = data.filter((a) => a.agentStatus === "approved").length;
    const suspended = data.filter(
      (a) => a.agentStatus === "rejected" || a.agentStatus === "suspended",
    ).length;

    return [
      {
        label: "Total Agents",
        val: total.toLocaleString(),
        icon: <User2 size={20} />,
        color: "bg-white",
      },
      {
        label: "Active Now",
        val: active.toLocaleString(),
        icon: <Activity size={20} />,
        color: "bg-white",
      },
      {
        label: "Suspended",
        val: suspended.toLocaleString(),
        icon: <UserMinus size={20} />,
        color: "bg-white text-red-500",
      },
    ];
  }, [data]);

  const handleAction = async (item, type) => {
    console.log(`${type}ing agent:`, item?.agentDetails?.name);

    setModal({ isOpen: false, type: "", item: null });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans antialiased">
      <Sidebar />

      <main className="transition-all duration-300 md:ml-64 p-4 pt-24 md:p-8 lg:p-12 md:pt-14">
        <div className="max-w-350 mx-auto">
          <Header
            flag="STAFF"
            flagSubtitle={"VERIFIED AGENTS"}
            title="Agents"
            mission="Manage agents and permissions"
            subMission="Access control"
          />

          <div className="w-full">
            <SearchInput />
          </div>

          <section className="mb-10">
            <KpiCards kpiInfo={kpiInfo} />
          </section>

          <section className="bg-white rounded-4xl border border-zinc-200 shadow-sm overflow-hidden transition-hover hover:shadow-md">
            <div className="p-1">
              {loading ? (
                <div className="p-20 text-center font-black animate-pulse">
                  FETCHING AGENT DATA...
                </div>
              ) : (
                <DataTable
                  data={data}
                  onSuspend={(item) =>
                    setModal({ isOpen: true, type: "suspend", item })
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

        <AddButton />

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

export default Agents;
