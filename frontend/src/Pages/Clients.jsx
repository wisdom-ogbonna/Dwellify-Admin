import { useState, useEffect } from "react";
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
  const [modal, setModal] = useState({ isOpen: false, type: "", item: null });

  const [kpiInfo] = useState([
    {
      label: "Total Clients",
      val: "340k",
      icon: <Users size={20} />,
      color: "bg-white",
    },
    {
      label: "Active Now",
      val: "12.5k",
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
    clientService.getAllClients().then(setData);
  }, []);

  const handleAction = (item, type) => {
    console.log(`${type}ing user:`, item?.name);
    setModal({ isOpen: false, type: "", item: null });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans antialiased">
      <Sidebar />

      <main className="transition-all duration-300 md:ml-64 p-4 pt-14 md:p-8 lg:p-12">
        <div className="max-w-350 mx-auto">

          <Header
            flag="Directory"
            flagSubtitle={"V0.0.0"}
            title="Clients"
            mission="Manage clients and resources"
            subMission="Resource Allocation"
          />

          <div className="w-full">
            <SearchInput />
          </div>

          <section className="mb-10">
            <KpiCards kpiInfo={kpiInfo} />
          </section>

          <section className="bg-white rounded-4xl border border-zinc-200 shadow-sm overflow-hidden transition-hover hover:shadow-md">
            <div className="p-1">
              <ClientDataTable
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

          <div className="mt-20">
            <Footer />
          </div>
        </div>

        <AddButton />

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

export default Clients;
