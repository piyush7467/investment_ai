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
        title: "Search Company",
        desc: "Enter any stock symbol or company name.",
    },
    {
        icon: <FaDatabase />,
        title: "Research Agent",
        desc: "Collects financial metrics from Yahoo Finance.",
    },
    {
        icon: <FaNewspaper />,
        title: "News Agent",
        desc: "Fetches the latest market news and sentiment.",
    },
    {
        icon: <FaRobot />,
        title: "Decision Agent",
        desc: "Gemini AI analyzes the data and generates recommendations.",
    },
    {
        icon: <FaChartPie />,
        title: "Investment Report",
        desc: "Receive AI recommendations, SWOT, risks, and action items.",
    },
];

const HowItWorks = () => {
    return (
        <section id="workflow" className="py-28 bg-[#11161D]">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">

                    <p className="text-cyan-400 uppercase tracking-widest font-semibold">
                        Workflow
                    </p>

                    <h2 className="heading text-5xl font-bold mt-4">
                        AI Multi-Agent Pipeline
                    </h2>

                    <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
                        Every investment analysis passes through multiple AI
                        agents to ensure a comprehensive and reliable report.
                    </p>

                </div>

                <div className="grid md:grid-cols-5 gap-8">

                    {steps.map((step, index) => (

                        <div
                            key={step.title}
                            className="relative bg-[#151A21] rounded-3xl border border-white/10 p-8 text-center"
                        >

                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-2xl text-emerald-400">
                                {step.icon}
                            </div>

                            <h3 className="heading text-xl mt-6">
                                {step.title}
                            </h3>

                            <p className="text-slate-400 mt-4 text-sm leading-6">
                                {step.desc}
                            </p>

                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-5 text-3xl text-slate-600">
                                    →
                                </div>
                            )}

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default HowItWorks;