import {
    FaRobot,
    FaNewspaper,
    FaChartLine,
    FaShieldAlt,
    FaBrain,
    FaHistory,
} from "react-icons/fa";

const features = [
    {
        icon: <FaRobot className="text-2xl text-emerald-400" />,
        title: "AI Analysis Agent",
        description:
            "Automated multi-node research pipelines deliver clear BUY, HOLD, or SELL recommendations with calculated confidence scores.",
        color: "group-hover:border-emerald-500/30"
    },
    {
        icon: <FaNewspaper className="text-2xl text-cyan-400" />,
        title: "News Stream Analytics",
        description:
            "Real-time news coverage mapping from trusted sources, indexing sentiment levels to weigh macro impact instantly.",
        color: "group-hover:border-cyan-500/30"
    },
    {
        icon: <FaChartLine className="text-2xl text-yellow-400" />,
        title: "Fundamental Metrics",
        description:
            "Evaluates essential balance sheet metrics including revenue expansion, cash flow streams, margins, and P/E ratios.",
        color: "group-hover:border-yellow-500/30"
    },
    {
        icon: <FaShieldAlt className="text-2xl text-red-400" />,
        title: "Risk Calibration",
        description:
            "Extracts key risk indicators, identifying valuation bubbles, operational hazards, and sector competition levels.",
        color: "group-hover:border-red-500/30"
    },
    {
        icon: <FaBrain className="text-2xl text-purple-400" />,
        title: "SWOT Intelligence",
        description:
            "Uses Gemini to structure qualitative findings into interactive strengths, weaknesses, opportunities, and threats matrices.",
        color: "group-hover:border-purple-500/30"
    },
    {
        icon: <FaHistory className="text-2xl text-orange-400" />,
        title: "Watchlist & History Logs",
        description:
            "Registered users unlock persistent database storage to instantly retrieve past company reports without triggering API limits.",
        color: "group-hover:border-orange-500/30"
    },
];

const Features = () => {
    return (
        <section id="features" className="py-24 px-8 relative">
            {/* Background highlights */}
            <div className="absolute top-10 left-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest">
                        Core Capabilities
                    </span>
                    <h2 className="heading text-4xl lg:text-5xl font-black mt-6 leading-tight">
                        Invest Smarter with Financial Intelligence
                    </h2>
                    <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-base leading-relaxed">
                        Say goodbye to hours of manual scanning. Our AI research engine parses market signals, crawls news databases, and highlights risks in seconds.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className={`bg-[#151A21]/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-300 group ${feature.color}`}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="heading text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;