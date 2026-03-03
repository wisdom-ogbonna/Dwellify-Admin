import {
  Smartphone,
  Apple,
  ShieldAlert,
  Trash2,
  UserCheck,
  Lock,
} from "lucide-react";

const RequestTable = ({ data, onSuspend, onDelete }) => {
  return (
    <div className="bg-white border-2 border-black rounded-4xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b-2 border-black">
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                User Profile
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                Platform
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500 text-center">
                Usage Stats
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                Current Status
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
            {data.map((item) => {
              const isSuspended = item.status?.toLowerCase() === "suspended";

              return (
                <tr
                  key={item.id}
                  className="hover:bg-zinc-50/50 transition-colors group"
                >
                  <td className="p-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-black transition-colors ${
                          isSuspended ? "bg-zinc-400" : "bg-black"
                        }`}
                      >
                        {item.name?.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div
                          className={`text-sm font-black ${
                            isSuspended
                              ? "text-zinc-400 line-through"
                              : "text-black"
                          }`}
                        >
                          {item.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 font-medium">
                          {item.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 bg-white w-fit px-3 py-1.5 rounded-xl border border-zinc-200 shadow-sm">
                      {item.device === "iOS" ? (
                        <Apple size={14} />
                      ) : (
                        <Smartphone size={14} />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-tight">
                        {item.device || "Android"}
                      </span>
                    </div>
                  </td>

                  <td className="p-6 text-center whitespace-nowrap">
                    <div className="inline-flex flex-col">
                      <span className="text-sm font-black">
                        {item.totalBookings || item.totalSales || 0}
                      </span>
                      <span className="text-[9px] font-bold uppercase text-zinc-400 tracking-widest">
                        Points
                      </span>
                    </div>
                  </td>

                  <td className="p-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          isSuspended
                            ? "bg-zinc-400"
                            : "bg-green-500 animate-pulse"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${
                          isSuspended ? "text-zinc-400" : "text-green-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <span
                      className={`text-xs font-black px-2 py-1 rounded-lg ${
                        item.reports > 0
                          ? "bg-red-100 text-red-600"
                          : "bg-zinc-100 text-zinc-400"
                      }`}
                    >
                      {item.reports || 0}
                    </span>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onSuspend(item)}
                        title={isSuspended ? "Unsuspend User" : "Suspend User"}
                        className={`p-2 rounded-xl transition-all border flex items-center justify-center
                          ${
                            isSuspended
                              ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                              : "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"
                          }`}
                      >
                        {isSuspended ? (
                          <UserCheck size={18} />
                        ) : (
                          <Lock size={18} />
                        )}
                      </button>

                      <button
                        onClick={() => onDelete(item)}
                        title="Delete User"
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

      {/* NEW FOOTER SECTION */}
      <div className="p-6 bg-zinc-50 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-black" />
          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500">
            Total Records:{" "}
            <span className="text-black">{data.length} Entries</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl border-2 border-black bg-black text-white text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            1
          </button>

          <button
            disabled
            className="w-10 h-10 rounded-xl border-2 border-zinc-200 bg-white text-zinc-300 text-xs font-black cursor-not-allowed"
          >
            2
          </button>

          <span className="px-2 text-zinc-300 font-black">...</span>

          <button
            disabled
            className="px-4 h-10 rounded-xl border-2 border-zinc-200 bg-white text-zinc-300 text-[10px] font-black uppercase tracking-widest cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestTable;
