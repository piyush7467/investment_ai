import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaRobot,
    FaShieldHalved,
} from "react-icons/fa6";

const DashboardPreview = () => {
    return (
        <section className="py-28 px-6">

            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16">

                    <p className="text-emerald-400 uppercase tracking-[4px]">
                        Dashboard Preview
                    </p>

                    <h2 className="heading text-5xl font-bold mt-4">
                        Professional AI Investment Report
                    </h2>

                </div>

                <div className="bg-[#151A21] border border-white/10 rounded-[30px] p-8 shadow-[0_10px_50px_rgba(0,0,0,.4)]">

                    <div className="grid lg:grid-cols-3 gap-6">

                        <div className="bg-[#0D1117] rounded-3xl p-6 border border-white/10">

                            <p className="text-slate-400">
                                Recommendation
                            </p>

                            <h2 className="text-5xl font-bold text-emerald-400 mt-5">
                                BUY
                            </h2>

                            <div className="mt-6 flex items-center gap-3">

                                <FaArrowTrendUp className="text-emerald-400"/>

                                <span className="text-slate-300">
                                    Confidence 92%
                                </span>

                            </div>

                        </div>

                        <div className="bg-[#0D1117] rounded-3xl p-6 border border-white/10">

                            <p className="text-slate-400">
                                Investment Score
                            </p>

                            <h2 className="text-5xl font-bold mt-5">
                                88
                            </h2>

                            <p className="text-emerald-400 mt-3">
                                Excellent Long Term
                            </p>

                        </div>

                        <div className="bg-[#0D1117] rounded-3xl p-6 border border-white/10">

                            <p className="text-slate-400">
                                Risk Level
                            </p>

                            <div className="flex items-center gap-3 mt-5">

                                <FaShieldHalved className="text-yellow-400 text-4xl"/>

                                <h2 className="text-4xl font-bold">
                                    Medium
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 mt-8">

                        <div className="bg-[#0D1117] rounded-3xl border border-white/10 p-6">

                            <div className="flex items-center gap-3">

                                <FaRobot className="text-cyan-400"/>

                                <h3 className="heading text-2xl">
                                    AI Summary
                                </h3>

                            </div>

                            <p className="text-slate-400 mt-5 leading-8">

                                Tesla demonstrates strong cash flow,
                                positive analyst sentiment,
                                and long-term AI opportunities.
                                Despite premium valuation,
                                fundamentals remain healthy,
                                making it attractive for long-term investors.

                            </p>

                        </div>

                        <div className="bg-[#0D1117] rounded-3xl border border-white/10 p-6">

                            <h3 className="heading text-2xl">
                                Key Takeaways
                            </h3>

                            <ul className="space-y-4 mt-6">

                                <li>✅ Strong Cash Position</li>

                                <li>✅ Positive Analyst Rating</li>

                                <li>⚠ Premium Valuation</li>

                                <li>📈 Long-Term Growth Potential</li>

                                <li>🤖 AI Expansion Opportunity</li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default DashboardPreview;