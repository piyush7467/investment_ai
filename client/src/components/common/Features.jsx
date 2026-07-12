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
        icon: <FaRobot className="text-3xl text-emerald-400" />,
        title: "AI Investment Analysis",
        description:
            "Receive AI-powered BUY, HOLD, or SELL recommendations with confidence scores.",
    },
    {
        icon: <FaNewspaper className="text-3xl text-cyan-400" />,
        title: "Live Financial News",
        description:
            "Stay updated with the latest market-moving news from trusted financial sources.",
    },
    {
        icon: <FaChartLine className="text-3xl text-yellow-400" />,
        title: "Financial Metrics",
        description:
            "Analyze revenue, cash flow, debt, margins, and other key company fundamentals.",
    },
    {
        icon: <FaShieldAlt className="text-3xl text-red-400" />,
        title: "Risk Assessment",
        description:
            "Identify valuation risks, competition, and macroeconomic factors before investing.",
    },
    {
        icon: <FaBrain className="text-3xl text-purple-400" />,
        title: "SWOT & AI Insights",
        description:
            "Automatically generate SWOT analysis, action items, and investment summaries.",
    },
    {
        icon: <FaHistory className="text-3xl text-orange-400" />,
        title: "Analysis History",
        description:
            "Registered users can save, revisit, and compare previous investment analyses.",
    },
];

const Features = () => {
    return (
        <section id="features" className="py-24 px-6">

            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16">

                    <p className="text-emerald-400 font-semibold uppercase tracking-widest">
                        Features
                    </p>

                    <h2 className="heading text-5xl font-bold mt-4">
                        Everything You Need to Invest Smarter
                    </h2>

                    <p className="text-slate-400 mt-6 max-w-3xl mx-auto">
                        InvestmentAI combines financial data, real-time news,
                        and artificial intelligence into one intelligent platform.
                    </p>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {features.map((feature) => (

                        <div
                            key={feature.title}
                            className="bg-[#151A21] border border-white/10 rounded-3xl p-8 hover:border-emerald-400 hover:-translate-y-2 transition-all duration-300"
                        >

                            {feature.icon}

                            <h3 className="heading text-2xl mt-6">
                                {feature.title}
                            </h3>

                            <p className="text-slate-400 mt-4 leading-7">
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