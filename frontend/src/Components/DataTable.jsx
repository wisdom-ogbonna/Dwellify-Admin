import { Trash2, UserCheck, Lock, Calendar, Phone } from "lucide-react";
import DateUtils from "../utils/DateFormats";

const DataTable = ({ data, onSuspend, onDelete }) => {


  return (
    <div className="bg-white border-2 border-black rounded-4xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b-2 border-black">
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                Agent Profile
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                Agency & License
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                Contact
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                Joined Date
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                Status
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500 text-center">
                Reports
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {data.map((agent) => {
              const isSuspended =
                agent.agentStatus?.toLowerCase() === "rejected" ||
                agent.agentStatus?.toLowerCase() === "suspended";
              const agentName = agent.agentDetails?.name || "N/A";

              return (
                <tr
                  key={agent.uid}
                  className="hover:bg-zinc-50/50 transition-colors group"
                >
                  {/* Profile Section */}
                  <td className="p-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-black transition-colors ${isSuspended ? "bg-zinc-400" : "bg-black"}`}
                      >
                        {agentName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div
                          className={`text-sm font-black ${isSuspended ? "text-zinc-400 line-through" : "text-black"}`}
                        >
                          {agentName}
                        </div>
                        <div className="text-[11px] text-zinc-400 font-medium lowercase">
                          {agent.agentDetails?.email || "No Email"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Agency & License */}
                  <td className="p-6 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-black uppercase">
                        {agent.agentDetails?.agencyName || "Independent"}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium italic">
                        LIC: {agent.agentDetails?.licenseId || "No License"}
                      </span>
                    </div>
                  </td>

                  {/* Phone Number (Swapped from Platform) */}
                  <td className="p-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-zinc-400" />
                      <span className="text-xs font-bold text-black">
                        {agent.phoneNumber || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Date Created */}
                  <td className="p-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-zinc-400" />
                      <span className="text-xs font-bold text-black">
                        {DateUtils.formatDate(agent.createdAt)}
                      </span>
                    </div>
                  </td>

                  {/* Status Mapping */}
                  <td className="p-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${agent.agentStatus === "approved" ? "bg-green-500 animate-pulse" : "bg-orange-400"}`}
                      />
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${agent.agentStatus === "approved" ? "text-green-600" : "text-orange-600"}`}
                      >
                        {agent.agentStatus || "Pending"}
                      </span>
                    </div>
                  </td>

                  {/* Reports Count */}
                  <td className="p-6 text-center">
                    <span
                      className={`text-xs font-black px-2 py-1 rounded-lg ${agent.reports > 0 ? "bg-red-100 text-red-600" : "bg-zinc-100 text-zinc-400"}`}
                    >
                      {agent.reports || 0}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onSuspend(agent)}
                        title={isSuspended ? "Approve Agent" : "Suspend Agent"}
                        className={`p-2 rounded-xl transition-all border flex items-center justify-center ${isSuspended ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100" : "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"}`}
                      >
                        {isSuspended ? (
                          <UserCheck size={18} />
                        ) : (
                          <Lock size={18} />
                        )}
                      </button>

                      <button
                        onClick={() => onDelete(agent)}
                        title="Delete Agent"
                        className="p-2 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="p-6 bg-zinc-50 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-black" />
          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">
            Total Records:{" "}
            <span className="text-black">{data.length} Agents</span>
          </span>
        </div>
        <div className="text-[10px] font-black uppercase text-zinc-400">
          Last Sync: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
