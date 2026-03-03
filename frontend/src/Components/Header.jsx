import { RefreshCw } from "lucide-react";
import { useReload } from "../hooks/useReload";
import { fetchStatsData } from "../services/fetchStats";

const Header = ({flag, flagSubtitle, title, mission, subMission}) => {
    const { isLoading, reload } = useReload(fetchStatsData);

    return (
      <header className="relative flex flex-row items-center justify-between mb-10 pb-8 border-b border-zinc-200 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">
              {flag}
            </span>
            {flagSubtitle === true ? (
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            ) : (
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                {flagSubtitle}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            {title}
          </h1>
          <p className="text-zinc-500 font-medium text-sm md:text-base">
            {mission} <span className="text-zinc-300 mx-2">|</span>
            <span className="text-black font-semibold"> {subMission}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="hidden sm:block text-right mr-2">
            <p className="text-[10px] uppercase font-bold text-zinc-400 leading-none">
              Last Sync
            </p>
            <p className="text-xs font-mono font-bold">Just Now</p>
          </div>
          <button
            onClick={reload}
            disabled={isLoading}
            className={`group h-12 w-12 md:h-14 md:w-14 border-2 border-black flex items-center justify-center rounded-2xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all
                  ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75 active:scale-90"}`}
          >
            <RefreshCw
              size={22}
              className={`${isLoading ? "animate-spin text-zinc-400" : "text-black group-hover:rotate-180 transition-transform duration-500"}`}
            />
          </button>
        </div>
      </header>
    );
}

export default Header;