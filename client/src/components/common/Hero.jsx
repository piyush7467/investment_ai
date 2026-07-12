import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { FaSearch, FaArrowRight, FaFileAlt } from "react-icons/fa";

import { analyzeCompany } from "../../features/investment/investment.api";
import {
    analysisStart,
    analysisSuccess,
    analysisFailure,
} from "../../features/investment/investment.slice";
import {
    hasReachedGuestLimit,
    incrementGuestSearchCount,
    getRemainingGuestSearches,
} from "../../utils/guestLimit";
import GuestLimitModal from "./GuestLimitModal";

const Hero = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { loading, analysis } = useSelector((state) => state.investment); // FIX: Added 'analysis' from Redux store

    const [company, setCompany] = useState("");
    const [preview, setPreview] = useState(null);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [remainingSearches, setRemainingSearches] = useState(
        getRemainingGuestSearches()
    );

    const handleAnalyze = async () => {
        if (!company.trim()) {
            return toast.error("Please enter a company name.");
        }

        // Guest Limit
        if (!user && hasReachedGuestLimit()) {
            setShowLimitModal(true);
            return;
        }

        try {
            dispatch(analysisStart());

            const response = await analyzeCompany(company.trim());

            console.log("API Response:", response);

            // FIX: Check if response has data property
            if (!response || !response.data) {
                throw new Error("No analysis data received.");
            }

            dispatch(analysisSuccess(response.data));
            setPreview(response.data);

            if (!user) {
                incrementGuestSearchCount();
                setRemainingSearches(getRemainingGuestSearches());
            }

            toast.success("Analysis completed!");
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Analysis failed.";

            dispatch(analysisFailure(message));
            toast.error(message);
        }
    };

    const handleViewReport = () => {
        // FIX: Use the analysis from Redux store instead of undefined 'store'
        const currentAnalysis = analysis || preview;

        if (!currentAnalysis) {
            toast.error("Generate a report first.");
            return;
        }

        navigate("/analysis");
    };

    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00C85322,transparent_55%)]" />

            <div className="max-w-7xl mx-auto min-h-[88vh] grid lg:grid-cols-2 gap-16 items-center px-8">
                {/* LEFT SECTION */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        AI Powered Investment Intelligence
                    </span>

                    <h1 className="heading text-6xl font-bold mt-8 leading-tight">
                        Research.
                        <br />
                        Analyze.
                        <br />
                        Decide.
                    </h1>

                    <p className="mt-8 text-slate-400 text-lg leading-8">
                        InvestmentAI combines financial statements,
                        real-time market news,
                        and AI generated investment reports
                        in seconds.
                    </p>

                    {!user && (
                        <div className="mt-6 inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-5 py-3">
                            <span className="text-emerald-400">
                                🎁 Free AI Reports Left :
                                <b className="ml-2">{remainingSearches}/3</b>
                            </span>
                        </div>
                    )}

                    <div className="mt-10">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleAnalyze();
                                        }
                                    }}
                                    placeholder="Apple, Tesla, Nvidia..."
                                    className="w-full pl-14 pr-4 py-4 rounded-2xl bg-[#151A21] border border-white/10 outline-none focus:border-emerald-400"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition disabled:opacity-70 cursor-pointer"
                            >
                                {loading ? (
                                    "Analyzing..."
                                ) : (
                                    <>
                                        Analyze
                                        <FaArrowRight />
                                    </>
                                )}
                            </button>
                        </div>

                        <p className="text-slate-500 mt-4">
                            Examples :
                            <span className="ml-2 text-white">
                                Apple • Tesla • Nvidia • Microsoft
                            </span>
                        </p>
                    </div>
                </motion.div>

                {/* RIGHT SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="bg-[#151A21] rounded-3xl border border-white/10 p-8 shadow-2xl"
                >
                    {/* Empty State */}
                    {!preview ? (
                        <div className="flex flex-col items-center justify-center text-center min-h-[500px]">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-4xl">
                                🤖
                            </div>
                            <h2 className="text-3xl font-bold mt-8">
                                AI Investment Report
                            </h2>
                            <p className="text-slate-400 mt-4 max-w-md leading-7">
                                Search any public company to generate an AI-powered investment
                                report including recommendation, valuation, SWOT analysis,
                                financial metrics, risks, and market news.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Company Info */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold">
                                        {preview.company?.name}
                                    </h2>
                                    <p className="text-slate-400 mt-2">
                                        {preview.company?.symbol}
                                        {preview.company?.industry && (
                                            <>
                                                {" • "}
                                                {preview.company.industry}
                                            </>
                                        )}
                                    </p>
                                </div>
                                <span className="px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm">
                                    Preview
                                </span>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 gap-5 mt-8">
                                <Card
                                    title="Recommendation"
                                    value={preview.recommendation?.recommendation || "N/A"}
                                    color={
                                        preview.recommendation?.recommendation === "BUY"
                                            ? "text-emerald-400"
                                            : preview.recommendation?.recommendation === "SELL"
                                                ? "text-red-400"
                                                : "text-yellow-400"
                                    }
                                />
                                <Card
                                    title="Confidence"
                                    value={
                                        preview.recommendation?.confidence
                                            ? `${preview.recommendation.confidence}%`
                                            : "N/A"
                                    }
                                />
                                <Card
                                    title="Risk"
                                    value={preview.recommendation?.riskLevel || "N/A"}
                                />
                                <Card
                                    title="Score"
                                    value={
                                        preview.recommendation?.investmentScore
                                            ? `${preview.recommendation.investmentScore}/100`
                                            : "N/A"
                                    }
                                />
                            </div>

                            {/* Summary */}
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold">AI Summary</h3>
                                <p className="text-slate-400 mt-4 leading-7">
                                    {preview.recommendation?.summary}
                                </p>
                            </div>

                            {/* Preview Notice */}
                            <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                                <h3 className="text-lg font-semibold text-cyan-400">
                                    📄 Preview Report
                                </h3>
                                <p className="text-slate-300 mt-3 leading-7">
                                    This is a preview of the AI investment analysis.
                                    Click <strong>View Complete Report</strong> to see:
                                </p>
                                <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                                    <div>✅ Financial Analysis</div>
                                    <div>✅ SWOT Analysis</div>
                                    <div>✅ Pros & Cons</div>
                                    <div>✅ Risk Assessment</div>
                                    <div>✅ Action Items</div>
                                    <div>✅ Latest News</div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={handleViewReport}
                                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
                                >
                                    <FaFileAlt />
                                    View Complete Report
                                </button>

                                {!user && (
                                    <Link
                                        to="/register"
                                        className="flex items-center justify-center px-7 rounded-2xl border border-white/10 hover:border-emerald-400 transition"
                                    >
                                        Register
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </motion.div>
            </div>

            <GuestLimitModal
                open={showLimitModal}
                onClose={() => setShowLimitModal(false)}
            />
        </section>
    );
};

const Card = ({ title, value, color = "text-white" }) => {
    return (
        <div className="bg-[#0D1117] rounded-2xl border border-white/10 p-5 hover:border-emerald-500/20 transition">
            <p className="text-slate-500 text-sm">{title}</p>
            <h2 className={`text-2xl font-bold mt-3 ${color}`}>{value}</h2>
        </div>
    );
};

export default Hero;