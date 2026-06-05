import { useState, useEffect, useMemo } from "react";
import { Users, Activity, UserMinus } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import KpiCards from "../Components/KpiCards";
import SearchInput from "../Components/SearchInput";
import ClientDataTable from "../Components/ClientDataTable";
import ActionModal from "../Components/ActionModal";
import AddButton from "../Components/AddButton";
import Footer from "../Components/Footer";
import { clientService } from "../services/clientService";
import Header from "../Components/Header";

const Clients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [syncTime, setSyncTime] = useState("--:--:--");
  const [modal, setModal] = useState({ isOpen: false, type: "", item: null });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const clients = await clientService.getAllClients();
      setData(clients || []);
      setSyncTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter((client) => {
      const name = client?.clientDetails?.name || "";
      const email = client?.clientDetails?.email || "";
      const id = client?.clientDetails?.id || client?.clientDetails?.uid || "";
      return (
        name.toLowerCase().includes(lowerSearch) ||
        email.toLowerCase().includes(lowerSearch) ||
        id.toLowerCase().includes(lowerSearch)
      );
    });
  }, [data, searchTerm]);

  const kpiInfo = useMemo(() => {
    const total = data.length;
    const active = data.filter(
      (c) => c.status?.toLowerCase() === "active",
    ).length;
    const suspended = data.filter(
      (c) => c.status?.toLowerCase() === "suspended",
    ).length;

    return [
      {
        label: "Total Clients",
        val: total.toLocaleString(),
        icon: <Users size={20} />,
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
    console.log(`${type}ing user:`, item?.clientDetails?.name);
    await fetchClients();
    setModal({ isOpen: false, type: "", item: null });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans antialiased">
      <Sidebar />

      <main className="transition-all duration-300 md:ml-64 p-4 pt-14 md:p-8 lg:p-12">
        <div className="max-w-350 mx-auto">
          {/* Added syncTime and fetchData mappings */}
          <Header
            flag="Directory"
            flagSubtitle="V0.0.0"
            title="Clients"
            mission="Manage clients and resources"
            subMission="Resource Allocation"
            syncTime={syncTime}
            fetchData={fetchClients}
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
                <div className="p-20 text-center font-black animate-pulse text-zinc-400">
                  FETCHING CLIENT DATA...
                </div>
              ) : (
                <ClientDataTable
                  data={filteredClients}
                  syncTime={syncTime}
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
          key={modal.item?.id || modal.item?.uid || "none"}
          isOpen={modal.isOpen}
          type={modal.type}
          targetItem={modal.item}
          titleText={modal.item?.name}
          onClose={() => setModal({ ...modal, isOpen: false })}
          onConfirm={() => handleAction(modal.item, modal.type)}
        />
      </main>
    </div>
  );
};

export default Clients;
