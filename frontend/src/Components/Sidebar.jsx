import { useState } from "react";
import {
  LayoutDashboard,
  User2,
  Users,
  ShieldAlert,
  Package,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      route: "/dashboard",
    },
    { name: "Clients", icon: <Users size={20} />, route: "/clients" },
    { name: "Agents", icon: <User2 size={20} />, route: "/agents" },
    { name: "Verification Requests", icon: <ShieldAlert size={20} />, route: "/verification-requests" },
    { name: "Resources", icon: <Package size={20} />, route: "/resources" },
    { name: "Settings", icon: <Settings size={20} />, route: "/settings" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-black text-white p-4 sticky top-0 z-50">
        <span className="font-black tracking-tighter uppercase">Dwellify</span>
        <button onClick={toggleSidebar} className="p-2 bg-zinc-900 rounded-lg">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed left-0 top-0 h-full w-64 border-r bg-black text-white border-zinc-800 p-6 z-50
        transition-transform duration-300 ease-in-out select-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:block
      `}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="font-black text-2xl tracking-tighter uppercase">
            Dwellify-Admin
          </div>
          {/* Close button inside sidebar for mobile */}
          <button onClick={toggleSidebar} className="md:hidden text-zinc-400">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.route;

            return (
              <div
                key={item.name}
                onClick={() => {
                  navigate(item.route);
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-zinc-800 text-white opacity-100"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900 opacity-80 hover:opacity-100"
                  }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
