import { useState } from "react";
import KpiCards from "../Components/KpiCards";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import SearchInput from "../Components/SearchInput";
import RequestTable from "../Components/RequestTable";

const VerificationRequests = () => {
  const [kpiInfo] = useState([
    {
      label: "Total Requests",
      val: "12.2k",
      color: "bg-white",
    },
    {
      label: "Total Approved",
      val: "3.2k",
      color: "bg-white",
    },
    {
      label: "Total Rejected",
      val: "1.1k",
      color: "bg-white",
    },
  ]);

  return (
    <div>
      <Sidebar />
      <main className="transition-all duration-300 md:ml-64 p-4 pt-14 md:p-8 lg:p-12">
        <Header
          flag="STAFF"
          flagSubtitle={"VERIFICATION REQUESTS"}
          title="Verification Requests"
          mission="Review and manage verification requests"
          subMission="Identity verification"
        />
        <SearchInput />
        <section className="mb-10">
          <KpiCards kpiInfo={kpiInfo} />
        </section>
        <div>
            <h2 className="font-bold text-3xl font-sans">Pending Requests</h2>
        </div>
        <RequestTable />
        <Footer />
      </main>
    </div>
  );
};

export default VerificationRequests;
