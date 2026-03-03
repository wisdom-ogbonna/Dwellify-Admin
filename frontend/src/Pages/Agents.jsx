import { useState, useEffect } from "react";
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

  const [kpiInfo] = useState([
    {
      label: "Total Agents",
      val: "40k",
      icon: <User2 size={20} />,
      color: "bg-white",
    },
    {
      label: "Active Now",
      val: "17.5k",
      icon: <Activity size={20} />,
      color: "bg-white",
    },
    {
      label: "Suspended",
      val: "1.2k",
      icon: <UserMinus size={20} />,
      color: "bg-white text-red-500",
    },
  ]);

  useEffect(() => {
    loadPendingRequests();
  }, []);

  const loadPendingRequests = async () => {
    setLoading(true);
    try {
      const res = await agentService.getAllAgents();
      const notPending = res.filter(
        (agent) => agent.status?.toLowerCase() !== "pending",
      );
      setData(notPending);
    } catch (error) {
      console.error("Failed to load requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (item, type) => {
    console.log(`${type}ing user:`, item?.name);
    setModal({ isOpen: false, type: "", item: null });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans antialiased">
      <Sidebar />

      <main className="transition-all duration-300 md:ml-64 p-4 pt-24 md:p-8 lg:p-12 md:pt-14">
        <div className="max-w-350 mx-auto">
          {/* Header Section */}
          <Header
            flag="STAFF"
            flagSubtitle={"VERIFIED AGENTS"}
            title="Agents"
            mission="Manage agents and permissions"
            subMission="Access control"
          />

          {/* Search Bar */}
          <div className="w-full">
            <SearchInput />
          </div>

          {/* KPI Section */}
          <section className="mb-10">
            <KpiCards kpiInfo={kpiInfo} />
          </section>

          {/* Data Section */}
          <section className="bg-white rounded-4xl border border-zinc-200 shadow-sm overflow-hidden transition-hover hover:shadow-md">
            <div className="p-1">
              <DataTable
                data={data}
                onSuspend={(item) =>
                  setModal({ isOpen: true, type: "suspend", item })
                }
                onDelete={(item) =>
                  setModal({ isOpen: true, type: "delete", item })
                }
              />
            </div>
          </section>

          {/* Footer */}
          <div className="mt-20">
            <Footer />
          </div>
        </div>

        <AddButton />

        {/* Action Confirmation Modal */}
        <ActionModal
          isOpen={modal.isOpen}
          type={modal.type}
          targetItem={modal.item}
          onClose={() => setModal({ ...modal, isOpen: false })}
          onConfirm={handleAction}
        />
      </main>
    </div>
  );
};

export default Agents;
