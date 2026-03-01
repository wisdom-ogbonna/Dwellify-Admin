import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import {
  Search,
  Filter,
  ShieldAlert,
  Trash2,
  Smartphone,
  Apple,
  Users,
  Activity,
  UserMinus,
  ArrowRight,
} from "lucide-react";
import { clientService } from "../services/clientService";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [modalConfig, setModalConfig] = useState({
    open: false,
    type: null,
    client: null,
  });
  const [confirmName, setConfirmName] = useState("");

  useEffect(() => {
    clientService.getAllClients().then(setClients);
  }, []);

  const openModal = (type, client) => {
    setModalConfig({ open: true, type, client });
    setConfirmName("");
  };

  const handleAction = () => {
    if (confirmName === modalConfig.client.name) {
      const actionText =
        modalConfig.type === "delete" ? "deleted" : "suspended";
      alert(`User ${modalConfig.client.name} has been ${actionText}.`);
      setModalConfig({ open: false, type: null, client: null });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex text-black font-sans selection:bg-black selection:text-white">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-6 lg:p-10">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
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
          ].map((kpi, i) => (
            <div
              key={i}
              className={`${kpi.color} border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  {kpi.label}
                </span>
                {kpi.icon}
              </div>
              <div className="text-3xl font-black">{kpi.val}</div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-black transition-transform group-focus-within:scale-110"
              size={18}
            />
            <input
              className="w-full bg-white border-2 border-black p-4 pl-12 rounded-2xl font-bold placeholder:text-gray-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              placeholder="Search by name or email..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate("/resources")}
            className="bg-white border-2 border-black px-6 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-2 hover:bg-black hover:text-white transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
          >
            Resources <ArrowRight size={16} />
          </button>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black text-white border-b-2 border-black">
                <th className="p-5 font-black uppercase text-[10px] tracking-widest">
                  User Profile
                </th>
                <th className="p-5 font-black uppercase text-[10px] tracking-widest">
                  Platform
                </th>
                <th className="p-5 font-black uppercase text-[10px] tracking-widest text-center">
                  Usage
                </th>
                <th className="p-5 font-black uppercase text-[10px] tracking-widest">
                  Status
                </th>
                <th className="p-5 font-black uppercase text-[10px] tracking-widest text-right">
                  Commands
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100 font-bold">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-zinc-50 transition-colors group"
                >
                  <td className="p-5">
                    <div className="text-sm font-black">{client.name}</div>
                    <div className="text-[10px] text-gray-400 font-medium lowercase italic">
                      {client.email}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 bg-gray-100 w-fit px-3 py-1 rounded-full border border-black/5">
                      {client.device === "iOS" ? (
                        <Apple size={14} />
                      ) : (
                        <Smartphone size={14} />
                      )}
                      <span className="text-[10px] uppercase">
                        {client.device || "Android"}
                      </span>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <div className="text-sm">{client.totalBookings || 0}</div>
                    <div className="text-[9px] uppercase text-gray-400">
                      Total Uses
                    </div>
                  </td>
                  <td className="p-5">
                    <span
                      className={`text-[10px] px-3 py-1 rounded-md border-2 ${
                        client.status === "Active"
                          ? "bg-green-50 border-green-500 text-green-700"
                          : "bg-red-50 border-red-500 text-red-700"
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openModal("suspend", client)}
                        className="hover:text-orange-500"
                      >
                        <ShieldAlert size={20} />
                      </button>
                      <button
                        onClick={() => openModal("delete", client)}
                        className="hover:text-red-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* REUSABLE ACTION MODAL */}
      {modalConfig.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-6">
          <div className="bg-white border-[3px] border-black p-8 rounded-[40px] w-full max-w-md shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-200">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border-2 border-black ${modalConfig.type === "delete" ? "bg-red-500" : "bg-orange-500"}`}
            >
              {modalConfig.type === "delete" ? (
                <Trash2 color="white" />
              ) : (
                <ShieldAlert color="white" />
              )}
            </div>
            <h2 className="text-2xl font-black uppercase leading-tight mb-2">
              Critical Action: {modalConfig.type}
            </h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              To proceed with {modalConfig.type}ing{" "}
              <span className="text-black font-black italic">
                "{modalConfig.client.name}"
              </span>
              , please type their name below for confirmation.
            </p>

            <input
              className="w-full bg-gray-50 border-2 border-black p-4 rounded-2xl font-bold mb-6 focus:bg-white outline-none"
              placeholder="Full name of client..."
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
            />

            <div className="flex gap-4">
              <button
                onClick={() => setModalConfig({ open: false })}
                className="flex-1 p-4 border-2 border-black rounded-2xl font-black uppercase text-xs hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                disabled={confirmName !== modalConfig.client.name}
                onClick={handleAction}
                className={`flex-1 p-4 border-2 border-black rounded-2xl font-black uppercase text-xs transition-all ${
                  confirmName === modalConfig.client.name
                    ? "bg-black text-white active:scale-95"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
