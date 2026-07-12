import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaChartLine, FaSignOutAlt, FaChartBar } from "react-icons/fa";
import { logout } from "../../features/auth/auth.slice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0D1117]/80 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                        <FaChartLine className="text-black text-sm sm:text-xl"/>
                    </div>
                    <div>
                        <h2 className="heading text-sm sm:text-xl font-bold text-white leading-none">
                            InvestmentAI
                        </h2>
                        <p className="text-[9px] sm:text-xs text-slate-400 mt-1 hidden sm:block">
                            Quantum Ledger
                        </p>
                    </div>
                </Link>

                {/* Center Links (Optional/Landing) */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="hover:text-emerald-400 transition text-sm text-slate-400">
                        Features
                    </a>
                    <a href="#workflow" className="hover:text-emerald-400 transition text-sm text-slate-400">
                        Workflow
                    </a>
                    <a href="#live-analysis" className="hover:text-emerald-400 transition text-sm text-slate-400">
                        Live Demo
                    </a>
                </div>

                {/* Right Side Auth Controls */}
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-2 sm:gap-5">
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 text-sm font-medium transition"
                            >
                                <FaChartBar className="text-xs" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>

                            {/* Profile Link showing avatar */}
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 border border-white/10 hover:border-emerald-400/50 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 transition bg-[#151A21]"
                            >
                                <img
                                    src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150"}
                                    alt={user.name}
                                    className="w-5 h-5 sm:w-7 sm:h-7 rounded-full object-cover border border-emerald-400/30"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150";
                                    }}
                                />
                                <span className="text-slate-300 hover:text-white text-xs sm:text-sm hidden sm:inline max-w-[100px] truncate">
                                    {user.name}
                                </span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm border border-red-500/20 hover:border-red-500/50 text-red-400 hover:bg-red-500/5 transition font-semibold cursor-pointer animate-fade-in"
                            >
                                <FaSignOutAlt className="text-xs" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/10 hover:border-emerald-400 transition text-xs sm:text-sm text-slate-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold text-xs sm:text-sm transition hover:opacity-90 text-center"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;