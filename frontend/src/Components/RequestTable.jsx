import { Smartphone, Apple, Clock, Search } from "lucide-react";

const RequestTable = ({ data, onApprove }) => {
  return (
    <div className="bg-white border-2 border-black rounded-4xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b-2 border-black">
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                Agent Candidate
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                Device
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500 text-center">
                KYC Flags
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500">
                Status
              </th>
              <th className="p-6 font-black uppercase text-[11px] tracking-tighter text-zinc-500 text-right">
                Review
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onApprove(item)}
                className="hover:bg-zinc-50/50 transition-colors group cursor-pointer"
              >
                <td className="p-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white text-xs font-black">
                      {item.name?.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-black text-black">
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
                  <span
                    className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                      item.reports > 0
                        ? "bg-red-100 text-red-600"
                        : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    {item.reports > 0 ? `${item.reports} Flags` : "Clean"}
                  </span>
                </td>

                <td className="p-6 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                      Pending
                    </span>
                  </div>
                </td>

                <td className="p-6 text-right">
                  <button className="px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:bg-zinc-800 transition-all">
                    Review File
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestTable;
