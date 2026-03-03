import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const VerificationRequests = () => {
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
            </main>
        </div>
    );
}

export default VerificationRequests;