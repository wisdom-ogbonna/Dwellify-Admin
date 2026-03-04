import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Clients from "./Pages/Clients";
import Agents from "./Pages/Agents";
import VerificationRequests from "./Pages/VerificatonRequests";
// import Resources from "./Pages/Resources";
// import Settings from "./Pages/Settings";
import Tests from "./Pages/Tests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/verification-requests" element={<VerificationRequests />} />
      {/*<Route path="/resources" element={<Resources />} />
      <Route path="/settings" element={<Settings />} /> */}
      <Route path="/tests" element={<Tests />} />
    </Routes>
  );
}

export default App;
