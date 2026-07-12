import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaChartLine, FaUser, FaSignOutAlt, FaHistory, FaAngleRight } from "react-icons/fa";
import { getHistory } from "../../features/investment/investment.api";
import { setHistoryList, analysisSuccess, clearAnalysis } from "../../features/investment/investment.slice";
import { logout } from "../../features/auth/auth.slice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector((state) => state.auth);
    const { history, analysis } = useSelector((state) => state.investment);

    const loadHistory = async () => {
        try {
            const response = await getHistory();
            if (response.success) {
                dispatch(setHistoryList(response.data));
            }
        } catch (error) {
            console.error("Failed to load history inside sidebar:", error);
        }
    };

    useEffect(() => {
        if (user) {
            loadHistory();
        }
    }, [user, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleNewAnalysis = () => {
        dispatch(clearAnalysis());
        navigate("/dashboard");
    };

    const handleSelectHistory = (item) => {
        dispatch(analysisSuccess(item));
        navigate("/analysis");
    };

    return (
        <aside className="w-64 bg-[#0D1117] border-r border-white/10 h-screen sticky top-0 flex flex-col justify-between flex-shrink-0 z-40">
            
            {/* Top Branding & Action */}
            <div className="p-5 flex flex-col gap-5">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                        <FaChartLine className="text-black text-sm"/>
                    </div>
                    <div>
                        <h2 className="heading text-md font-bold text-white">
                            InvestmentAI
                        </h2>
                    </div>
                </Link>

                <button
                    onClick={handleNewAnalysis}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500/10 to-cyan-400/10 hover:from-emerald-500/20 hover:to-cyan-400/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                >
                    <FaPlus className="text-xs" />
                    New Research
                </button>
            </div>

            {/* Middle: Scrollable History */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
                <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    <FaHistory className="text-[10px]" />
                    Recent Searches
                </div>

                {history && history.length > 0 ? (
                    history.map((item) => {
                        const isActive = location.pathname === "/analysis" && 
                                         analysis?._id === item._id;
                        return (
                            <button
                                key={item._id}
                                onClick={() => handleSelectHistory(item)}
                                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center justify-between transition group cursor-pointer ${
                                    isActive
                                        ? "bg-emerald-500/15 border border-emerald-500/20 text-emerald-400"
                                        : "hover:bg-[#151A21] border border-transparent text-slate-400 hover:text-white"
                                }`}
                            >
                                <div className="truncate flex flex-col flex-1">
                                    <span className="font-semibold text-xs text-slate-200 group-hover:text-white truncate">
                                        {item.company?.symbol}
                                    </span>
                                    <span className="text-[10px] text-slate-500 group-hover:text-slate-400 truncate mt-0.5">
                                        {item.company?.name}
                                    </span>
                                </div>
                                <FaAngleRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-slate-400" />
                            </button>
                        );
                    })
                ) : (
                    <div className="px-3 py-8 text-center text-xs text-slate-600">
                        No recent reports.
                    </div>
                )}
            </div>

            {/* Bottom: Profile & Logout */}
            <div className="p-4 border-t border-white/5 bg-[#090D12]">
                <Link
                    to="/profile"
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#151A21] transition"
                >
                    <img
                        src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150"}
                        alt={user?.name}
                        className="w-9 h-9 rounded-full object-cover border border-emerald-400/20"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150";
                        }}
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                    </div>
                </Link>

                <div className="grid grid-cols-2 gap-2 mt-3">
                    <Link
                        to="/profile"
                        className="py-2 text-center rounded-lg border border-white/10 hover:border-emerald-400/30 text-xs text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5"
                    >
                        <FaUser className="text-[10px]" />
                        Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="py-2 text-center rounded-lg border border-red-500/10 hover:border-red-500/30 text-xs text-red-400 hover:bg-red-500/5 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                        <FaSignOutAlt className="text-[10px]" />
                        Logout
                    </button>
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;
