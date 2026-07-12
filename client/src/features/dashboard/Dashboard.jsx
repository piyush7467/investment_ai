import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaArrowRight,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";

import { analyzeCompany, getHistory } from "../investment/investment.api";
import {
  analysisStart,
  analysisSuccess,
  analysisFailure,
  setHistoryList,
} from "../investment/investment.slice";

const Dashboard = () => {
  const [company, setCompany] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { history, loading } = useSelector((state) => state.investment);

  const handleAnalyze = async () => {
    if (!company.trim()) {
      return toast.error("Please enter a company name.");
    }

    try {
      dispatch(analysisStart());

      const response = await analyzeCompany(company.trim());

      console.log("API Response:", response);
      console.log("Response Data:", response.data);

      dispatch(analysisSuccess(response.data));

      toast.success("Analysis completed successfully!");

      // Update global history in redux store so sidebar and dashboard sync immediately
      const historyResponse = await getHistory();
      if (historyResponse.success) {
        dispatch(setHistoryList(historyResponse.data));
      }

      navigate("/analysis");
    } catch (error) {
      dispatch(
        analysisFailure(
          error.response?.data?.message || "Analysis failed."
        )
      );

      toast.error(
        error.response?.data?.message || "Analysis failed."
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Welcome */}

      <div>

        <h1 className="text-4xl font-bold">
          Welcome back,{" "}
          <span className="text-emerald-400">
            {user?.name}
          </span>{" "}
          👋
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Analyze companies with AI-powered financial insights.
        </p>

      </div>

      {/* Search Card */}

      <div className="mt-10 bg-[#151A21] border border-white/10 rounded-3xl p-8 shadow-xl">

        <div className="flex items-center gap-3 mb-6">

          <FaChartLine className="text-emerald-400 text-2xl" />

          <h2 className="text-2xl font-semibold">
            AI Company Analysis
          </h2>

        </div>

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
              placeholder="Tesla, Apple, Nvidia, Reliance..."
              className="w-full pl-14 pr-4 py-4 rounded-2xl bg-[#0D1117] border border-white/10 outline-none focus:border-emerald-400"
            />

          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] transition disabled:opacity-70"
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

      </div>

      {/* Recent Analysis */}

      <div className="mt-10 bg-[#151A21] border border-white/10 rounded-3xl p-8">

        <h2 className="text-2xl font-semibold">
          Recent Analysis
        </h2>

        {history.length === 0 ? (
          <div className="mt-6 border border-dashed border-white/10 rounded-2xl p-10 text-center">

            <div className="text-5xl mb-4">
              📊
            </div>

            <h3 className="text-xl font-semibold">
              No analysis yet
            </h3>

            <p className="text-slate-400 mt-3 max-w-lg mx-auto">
              Your AI investment reports will appear here.
              Search for a company above to generate your
              first analysis.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {history.map((item) => (
              <div 
                key={item._id} 
                onClick={() => {
                  dispatch(analysisSuccess(item));
                  navigate("/analysis");
                }}
                className="bg-[#0D1117] border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-emerald-400/50 hover:scale-[1.01] transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-lg truncate">{item.company.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded font-bold ${
                      item.recommendation?.recommendation === "BUY" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      item.recommendation?.recommendation === "SELL" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}>
                      {item.recommendation?.recommendation}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">{item.company.symbol}</p>
                  <p className="text-slate-300 text-sm mt-3 line-clamp-3 leading-relaxed">
                    {item.recommendation?.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-6 pt-4 border-t border-white/5">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  <span>Confidence: {item.recommendation?.confidence || 0}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* AI Assistant */}

      <div className="mt-10 bg-[#151A21] border border-white/10 rounded-3xl p-8">

        <div className="flex items-center gap-3 mb-6">

          <FaRobot className="text-cyan-400 text-2xl" />

          <h2 className="text-2xl font-semibold">
            AI Investment Assistant
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-[#0D1117] rounded-2xl p-5 border border-white/5">
            📈 Analyze any public company
          </div>

          <div className="bg-[#0D1117] rounded-2xl p-5 border border-white/5">
            💰 Financial statements & valuation
          </div>

          <div className="bg-[#0D1117] rounded-2xl p-5 border border-white/5">
            📰 Latest market news
          </div>

          <div className="bg-[#0D1117] rounded-2xl p-5 border border-white/5">
            🤖 AI BUY / HOLD / SELL recommendation
          </div>

          <div className="bg-[#0D1117] rounded-2xl p-5 border border-white/5">
            ⚠️ Risk Assessment
          </div>

          <div className="bg-[#0D1117] rounded-2xl p-5 border border-white/5">
            📊 SWOT Analysis
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;