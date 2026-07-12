import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaArrowRight,
  FaChartLine,
  FaRobot,
  FaFileAlt,
} from "react-icons/fa";

import {
  getRemainingSearches,
  incrementGuestSearch,
  hasReachedLimit,
} from "../../utils/guestSearch";

import { analyzeCompany } from "../../features/investment/investment.api";

const LiveAnalysis = () => {
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const [remaining, setRemaining] = useState(
    getRemainingSearches()
  );

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!company.trim()) {
      return toast.error("Please enter a company name.");
    }

    if (hasReachedLimit()) {
      return toast.error(
        "Free limit reached. Create an account for unlimited analysis."
      );
    }

    try {
      setLoading(true);

      const response = await analyzeCompany(company.trim());

      if (!response.success) {
        throw new Error(response.message);
      }

      setAnalysis(response.data);

      incrementGuestSearch();

      setRemaining(getRemainingSearches());

      toast.success("Analysis completed successfully!");

    } catch (error) {
      toast.error(error.message || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewFullReport = () => {
    if (!analysis) {
      toast.error("Please analyze a company first.");
      return;
    }

    // Navigate to analysis page with the data
    navigate("/analysis", { state: { analysisData: analysis } });
  };

  return (
    <section
      id="live-analysis"
      className="py-28 px-6"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">

        {/* LEFT */}

        <div>

          <div className="flex items-center justify-between">

            <span className="text-emerald-400 font-semibold">
              LIVE DEMO
            </span>

            <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">

              {remaining} / 5 Free Searches Left

            </span>

          </div>

          <h2 className="heading text-5xl mt-6">
            Try InvestmentAI
            <br />
            Without Signing Up
          </h2>

          <p className="mt-6 text-slate-400 text-lg leading-8">
            Experience the complete AI investment report.
            Guests receive 5 free analyses with no hidden data.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <div className="flex-1 relative">

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                value={company}
                disabled={hasReachedLimit()}
                onChange={(e) => setCompany(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAnalyze();
                }}
                placeholder="Apple, Tesla, Nvidia..."
                className="w-full pl-14 pr-4 py-4 rounded-2xl bg-[#151A21] border border-white/10 outline-none focus:border-emerald-400 disabled:opacity-50"
              />

            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || hasReachedLimit()}
              className="px-8 py-4 sm:py-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold flex items-center justify-center gap-3 hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 w-full sm:w-auto cursor-pointer"
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
            Examples:
            <span className="ml-2 text-white">
              Apple • Tesla • Nvidia • Microsoft
            </span>
          </p>

        </div>

        {/* RIGHT */}

        <div className="bg-[#151A21] border border-white/10 rounded-3xl p-8 min-h-[650px]">

          {!analysis ? (

            hasReachedLimit() ? (

              <div className="text-center py-20">

                <div className="text-6xl mb-5">
                  🚀
                </div>

                <h2 className="heading text-3xl">
                  Free Limit Reached
                </h2>

                <p className="text-slate-400 mt-5 leading-7">
                  You've used all 5 free AI investment analyses.
                  Create your free account to unlock unlimited
                  company research, saved reports and portfolio tracking.
                </p>

                <Link
                  to="/register"
                  className="inline-block mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold"
                >
                  Create Free Account
                </Link>

              </div>

            ) : (

              <div className="text-center py-20">

                <FaRobot className="text-6xl text-cyan-400 mx-auto" />

                <h3 className="heading text-3xl mt-6">
                  AI Investment Report
                </h3>

                <p className="text-slate-400 mt-4 leading-7">
                  Search any company to generate a complete
                  professional AI investment report.
                </p>

              </div>

            )

          ) : (

            <>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaChartLine className="text-emerald-400 text-2xl" />
                  <h2 className="heading text-3xl">
                    {analysis.company?.name}
                  </h2>
                </div>
                <span className="px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm">
                  Preview
                </span>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-8">

                <StatCard
                  title="Recommendation"
                  value={analysis.recommendation?.recommendation}
                  color={
                    analysis.recommendation?.recommendation === "BUY"
                      ? "text-emerald-400"
                      : analysis.recommendation?.recommendation === "SELL"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                />

                <StatCard
                  title="Confidence"
                  value={`${analysis.recommendation?.confidence}%`}
                />

                <StatCard
                  title="Risk"
                  value={analysis.recommendation?.riskLevel}
                  color={
                    analysis.recommendation?.riskLevel === "HIGH"
                      ? "text-red-400"
                      : analysis.recommendation?.riskLevel === "MEDIUM"
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }
                />

                <StatCard
                  title="Score"
                  value={`${analysis.recommendation?.investmentScore}/100`}
                />

              </div>

              <div className="mt-8">

                <h3 className="font-semibold text-lg">
                  AI Summary
                </h3>

                <p className="text-slate-400 mt-4 leading-7">

                  {analysis.recommendation?.summary}

                </p>

              </div>

              {/* View Full Report Button */}
              <div className="mt-8">
                <button
                  onClick={handleViewFullReport}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
                >
                  <FaFileAlt />
                  View Full Report
                </button>
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                  <div>

                    <h3 className="heading text-2xl">
                      Save this report forever
                    </h3>

                    <p className="text-slate-400 mt-2">
                      Unlimited reports, portfolio tracking,
                      watchlist and AI history.
                    </p>

                  </div>

                  <Link
                    to="/register"
                    className="px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold text-center w-full sm:w-auto block cursor-pointer"
                  >
                    Register Free
                  </Link>

                </div>

              </div>

            </>

          )}

        </div>

      </div>
    </section>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="bg-[#0D1117] border border-white/10 rounded-2xl p-5">

    <p className="text-slate-500 text-sm">
      {title}
    </p>

    <h3 className={`text-2xl font-bold mt-3 ${color || ""}`}>
      {value || "N/A"}
    </h3>

  </div>
);

export default LiveAnalysis;