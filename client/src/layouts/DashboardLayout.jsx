import { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars, FaChartLine } from "react-icons/fa";
import Sidebar from "../components/common/Sidebar";
import Chatbot from "../features/chatbot/Chatbot";

const DashboardLayout = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Auto-close sidebar on route change on mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    // Protect private dashboard/profile routes from unauthorized access
    if (!isAuthenticated && (location.pathname === "/dashboard" || location.pathname === "/profile")) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">

            {/* Mobile Header Bar */}
            {isAuthenticated && (
                <header className="md:hidden flex items-center justify-between bg-[#0D1117] border-b border-white/10 px-6 py-4 sticky top-0 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-slate-400 hover:text-white p-2 cursor-pointer"
                    >
                        <FaBars className="text-xl" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                            <FaChartLine className="text-black text-xs" />
                        </div>
                        <span className="font-bold text-sm text-white">InvestmentAI</span>
                    </div>
                    <div className="w-8" /> {/* Spacer to center the title */}
                </header>
            )}

            {/* Sidebar backdrop for mobile overlay */}
            {isAuthenticated && isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            {isAuthenticated && (
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            )}

            {/* Main scrollable body */}
            <main className="flex-1 overflow-y-auto h-screen">
                <Outlet />
            </main>
            <Chatbot />

        </div>
    );
};

export default DashboardLayout;