const stats = [
    { value: "100+", label: "Assets Analyzed", sub: "Global tech & blue chips" },
    { value: "24/7", label: "Real-time Monitoring", sub: "Continuous news ingestion" },
    { value: "5 sec", label: "Agent Reasoning", sub: "Parallel LangGraph node execution" },
    { value: "92%", label: "Accuracy Index", sub: "Gemini 2.5 Flash metrics" }
];

const Stats = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((item) => (
                        <div
                            key={item.label}
                            className="bg-[#151A21]/45 backdrop-blur-md rounded-3xl border border-white/5 hover:border-emerald-500/20 p-8 text-center transition-all duration-300 hover:scale-[1.03] group"
                        >
                            <h2 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:from-emerald-300 group-hover:to-cyan-300 transition-all duration-300">
                                {item.value}
                            </h2>
                            <p className="mt-3 text-slate-200 text-sm font-semibold tracking-wide">
                                {item.label}
                            </p>
                            <p className="mt-1 text-slate-500 text-xs leading-normal">
                                {item.sub}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;