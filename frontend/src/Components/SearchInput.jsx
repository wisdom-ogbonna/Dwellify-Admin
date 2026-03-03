import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Filter } from "lucide-react";

function SearchInput() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-black transition-transform group-focus-within:scale-110"
          size={18}
        />
        <input
          className="w-full bg-white border-2 border-black p-4 pl-12 rounded-2xl font-bold placeholder:text-gray-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          placeholder="Search by name, email or id..."
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
  );
}

export default SearchInput;
