import { Link } from "react-router-dom";
import {
    FaArrowTrendUp,
    FaRobot,
    FaShieldHalved,
    FaBolt,
    FaArrowRight
} from "react-icons/fa6";

const DashboardPreview = () => {
    return (
        <section className="py-24 px-8 relative">
            {/* Soft Ambient light behind preview */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest">
                        Interface Mockup
                    </span>
                    <h2 className="heading text-4xl lg:text-5xl font-black mt-6 leading-tight">
                        Professional Intelligence Reports
                    </h2>
                    <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-base leading-relaxed">
                        Below is an interactive preview of the comprehensive, high-fidelity dashboards generated for registered members.
                    </p>
                </div>

                {/* Glassmorphic Mockup Container */}
                <div className="bg-[#151A21]/70 border border-white/10 rounded-[32px] p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,.5)] backdrop-blur-xl relative overflow-hidden max-w-5xl mx-auto">
                    {/* Mock Browser Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
                        <div className="flex items-center gap-2">
                            <span className="w-3 w-3 h-3 rounded-full bg-red-500/70" />
                            <span className="w-3 w-3 h-3 rounded-full bg-yellow-500/70" />
                            <span className="w-3 w-3 h-3 rounded-full bg-emerald-500/70" />
                            <span className="text-slate-500 text-xs font-semibold ml-4 bg-white/5 px-4 py-1 rounded-lg select-none">
                                investment-ai.com/report/TSLA
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">LIVE MOCKUP</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Recommendation Card */}
                        <div className="bg-[#090D12]/90 rounded-3xl p-6 border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                                Consensus Recommendation
                            </p>
                            <h2 className="text-5xl font-black text-emerald-400 mt-5 tracking-tight">
                                BUY
                            </h2>
                            <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">
                                <FaArrowTrendUp className="text-emerald-400 text-xs" />
                                <span>Confidence Rating:</span>
                                <strong className="text-white">92%</strong>
                            </div>
                        </div>

                        {/* Investment Score Card */}
                        <div className="bg-[#090D12]/90 rounded-3xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all duration-300">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                                Platform Investment Score
                            </p>
                            <h2 className="text-5xl font-black mt-5 tracking-tight text-white">
                                88<span className="text-slate-600 text-2xl font-light">/100</span>
                            </h2>
                            <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">
                                <FaBolt className="text-cyan-400 text-xs animate-pulse" />
                                <span>Signal Rating:</span>
                                <strong className="text-cyan-400">Excellent Buy</strong>
                            </div>
                        </div>

                        {/* Risk Level Card */}
                        <div className="bg-[#090D12]/90 rounded-3xl p-6 border border-white/5 hover:border-yellow-500/20 transition-all duration-300">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                                Volatility Risk Rating
                            </p>
                            <div className="flex items-center gap-3 mt-5">
                                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                                    <FaShieldHalved className="text-yellow-400 text-lg" />
                                </div>
                                <h2 className="text-3xl font-black text-white">
                                    Medium
                                </h2>
                            </div>
                            <div className="mt-6 text-sm text-slate-500">
                                Moderate beta index of 1.25
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 mt-6">
                        {/* AI Summary Panel */}
                        <div className="bg-[#090D12]/90 rounded-3xl border border-white/5 p-8">
                            <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-4">
                                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                    <FaRobot className="text-cyan-400 text-sm" />
                                </div>
                                <h3 className="heading text-lg font-bold text-white">
                                    AI Summary Analysis
                                </h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Tesla demonstrates robust cash flows, positive Wall Street consensus, and extensive opportunities in AI and energy storage. Despite premium valuation levels, fundamental metrics remain highly competitive for mid-to-long term portfolios.
                            </p>
                        </div>

                        {/* Key Takeaways Panel */}
                        <div className="bg-[#090D12]/90 rounded-3xl border border-white/5 p-8">
                            <h3 className="heading text-lg font-bold text-white mb-5 border-b border-white/5 pb-4">
                                Platform Takeaways
                            </h3>
                            <ul className="space-y-3.5 text-sm text-slate-300">
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span>Strong Free Cash Flow and Capital Liquidity</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span>Favorable Multi-Broker Rating Consensus</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                    <span>Premium Trading Valuation Multiples (P/E, PEG)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span>Rapid Scaling in Ancillary Charging Revenues</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA Overlay inside Mockup */}
                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-md font-bold text-white">Unlock All Research Tools</h4>
                            <p className="text-xs text-slate-500 mt-1">Get comprehensive reports with SWOT analysis, news streams, watchlists, and AI chat assistants.</p>
                        </div>
                        <Link
                            to="/register"
                            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            Get Started Free
                            <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPreview;