import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/common/Sidebar";
import Chatbot from "../features/chatbot/Chatbot";

const DashboardLayout = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();

    // Protect private dashboard/profile routes from unauthorized access
    if (!isAuthenticated && (location.pathname === "/dashboard" || location.pathname === "/profile")) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white flex">

            {isAuthenticated && <Sidebar />}
            <main className="flex-1 overflow-y-auto h-screen">
                <Outlet />
            </main>
            <Chatbot />

        </div>
    );
};

export default DashboardLayout;