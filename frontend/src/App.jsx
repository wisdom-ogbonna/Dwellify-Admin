import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";
// import Agents from "./Pages/Agents";
// import Resources from "./Pages/Resources";
// import Settings from "./Pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clients" element={<Clients />} />
      {/* <Route path="/agents" element={<Agents />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/settings" element={<Settings />} /> */}
    </Routes>
  );
}

export default App;
