import {
  X,
  ShieldCheck,
  Mail,
  Smartphone,
  Apple,
  FileText,
  Check,
  Ban,
  AlertTriangle,
} from "lucide-react";

const AgentRequest = ({ agent, isOpen, onClose, onApprove, onDeny }) => {
  if (!agent) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white border-l-4 border-black z-[70] transform transition-transform duration-500 ease-in-out shadow-[-20px_0_50px_rgba(0,0,0,0.2)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b-2 border-black flex justify-between items-center bg-zinc-50">
          <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            Verification File
          </span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 rounded-xl transition-all border-2 border-transparent hover:border-black"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto h-[calc(100%-110px)] pb-32">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="h-24 w-24 rounded-3xl bg-zinc-900 flex items-center justify-center text-white text-3xl font-black mb-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black uppercase">
              {agent.name?.substring(0, 2)}
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight">
              {agent.name}
            </h2>
            <p className="text-zinc-400 font-bold text-[10px] tracking-[0.2em] uppercase mt-1">
              Ref: AGT-{agent.id?.substring(0, 8) || "PENDING"}
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="p-4 rounded-2xl border-2 border-black bg-white flex items-center gap-4">
              <Mail className="text-zinc-400" size={18} />
              <div className="overflow-hidden">
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">
                  Email Address
                </p>
                <p className="text-sm font-bold truncate">{agent.email}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border-2 border-black bg-white flex items-center gap-4">
              {agent.device === "iOS" ? (
                <Apple size={18} />
              ) : (
                <Smartphone size={18} />
              )}
              <div>
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">
                  Platform
                </p>
                <p className="text-sm font-bold uppercase">
                  {agent.device || "Android"}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border-2 border-black bg-zinc-50 flex items-center gap-4">
              <ShieldCheck className="text-emerald-500" size={18} />
              <div>
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">
                  Security Status
                </p>
                <p className="text-sm font-bold">Clear / No Flags</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-[11px] uppercase tracking-widest text-zinc-400">
              Submitted Documents
            </h3>
            <button className="w-full group p-4 rounded-2xl border-2 border-black flex items-center justify-between hover:bg-black hover:text-white transition-all text-left">
              <div className="flex items-center gap-3">
                <FileText size={20} />
                <span className="text-xs font-black uppercase tracking-tight">
                  Identity_Card.pdf
                </span>
              </div>
              <span className="text-[9px] font-black uppercase">View</span>
            </button>
          </div>
        </div>

        {/* Action Footer */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t-2 border-black flex gap-3">
          <button
            onClick={() => onDeny(agent)}
            className="flex-1 h-14 border-2 border-black bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-white transition-all active:translate-y-1"
          >
            <Ban size={16} className="inline mr-2" /> Reject
          </button>
          <button
            onClick={() => onApprove(agent)}
            className="flex-1 h-14 bg-emerald-500 border-2 border-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <Check size={16} className="inline mr-2" /> Approve
          </button>
        </div>
      </aside>
    </>
  );
};

export default AgentRequest;
