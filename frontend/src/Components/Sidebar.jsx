import {
  LayoutDashboard,
  User,
  User2,
  Package,
  Settings,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      route: "/dashboard",
    },
    { name: "Clients", icon: <User size={20} />, route: "/clients" },
    { name: "Agents", icon: <User2 size={20} />, route: "/agents" },
    { name: "Resources", icon: <Package size={20} />, route: "/resources" },
    { name: "Settings", icon: <Settings size={20} />, route: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r bg-black text-white border-zinc-800 p-6 hidden md:block select-none">
      <div className="mb-12 font-black text-2xl tracking-tighter uppercase">
        Dwellify-Admin
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.route;

          return (
            <div
              key={item.name}
              onClick={() => navigate(item.route)}
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
  );
}

export default Sidebar;
