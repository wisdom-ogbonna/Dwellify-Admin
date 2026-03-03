import { ShieldAlert, Trash2 } from "lucide-react";
import { useState } from "react";

function ActionModal({ isOpen, type, targetItem, onClose, onConfirm }) {
  const [confirmName, setConfirmName] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (confirmName === targetItem.name) {
      onConfirm(targetItem, type);
      setConfirmName("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-6">
      <div className="bg-white border-[3px] border-black p-8 rounded-[40px] w-full max-w-md shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border-2 border-black ${type === "delete" ? "bg-red-500" : "bg-orange-500"}`}
        >
          {type === "delete" ? (
            <Trash2 color="white" />
          ) : (
            <ShieldAlert color="white" />
          )}
        </div>
        <h2 className="text-2xl font-black uppercase mb-2">
          Critical Action: {type}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          To {type}{" "}
          <span className="text-black font-black italic">
            "{targetItem?.name}"
          </span>
          , type their name below.
        </p>

        <input
          className="w-full bg-gray-50 border-2 border-black p-4 rounded-2xl font-bold mb-6 outline-none"
          placeholder="Type name here..."
          value={confirmName}
          onChange={(e) => setConfirmName(e.target.value)}
        />

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 p-4 border-2 border-black rounded-2xl font-black uppercase text-xs"
          >
            Cancel
          </button>
          <button
            disabled={confirmName !== targetItem?.name}
            onClick={handleConfirm}
            className={`flex-1 p-4 border-2 border-black rounded-2xl font-black uppercase text-xs ${confirmName === targetItem?.name ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActionModal;
