import {
    FaSearch,
    FaDatabase,
    FaNewspaper,
    FaRobot,
    FaChartPie,
} from "react-icons/fa";

const steps = [
    {
        icon: <FaSearch />,
        title: "1. Search Assets",
        desc: "Submit any stock symbol or name to target.",
        badge: "Trigger"
    },
    {
        icon: <FaDatabase />,
        title: "2. Financial Agent",
        desc: "Crawls Yahoo Finance for real-time financials and metrics.",
        badge: "Data Nodes"
    },
    {
        icon: <FaNewspaper />,
        title: "3. News Crawler",
        desc: "Aggregates global media streams & sentiment scores.",
        badge: "Data Nodes"
    },
    {
        icon: <FaRobot />,
        title: "4. LLM Decision",
        desc: "Gemini 2.5 Flash analyzes quantitative and qualitative states.",
        badge: "Reasoning"
    },
    {
        icon: <FaChartPie />,
        title: "5. Final Report",
        desc: "Outputs structured SWOT matrices, pros/cons, and target score.",
        badge: "Artifact"
    },
];

const HowItWorks = () => {
    return (
        <section id="workflow" className="py-24 bg-[#090D12]/70 border-y border-white/5 relative">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-20">
                    <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-widest">
                        System Architecture
                    </span>
                    <h2 className="heading text-4xl lg:text-5xl font-black mt-6 leading-tight">
                        AI Agent Pipeline Flow
                    </h2>
                    <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-base leading-relaxed">
                        Under the hood, InvestmentAI utilizes a coordinated multi-agent orchestrator built with LangChain to produce consistent, objective analysis.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className="relative bg-[#151A21]/45 border border-white/5 rounded-3xl p-6 hover:border-emerald-500/20 transition-all duration-300 text-center flex flex-col items-center group"
                        >
                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-4 px-2 py-0.5 bg-white/5 rounded">
                                {step.badge}
                            </span>

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 text-emerald-400 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform duration-300">
                                {step.icon}
                            </div>

                            <h3 className="heading text-md font-bold text-white mb-2">
                                {step.title}
                            </h3>

                            <p className="text-slate-400 text-xs leading-relaxed">
                                {step.desc}
                            </p>

                            {/* Connecting Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-[45%] -right-4 w-8 border-t border-dashed border-white/10 z-0 pointer-events-none" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;