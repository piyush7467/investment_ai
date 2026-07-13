import { useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaBuilding,
  FaDollarSign,
  FaChartLine,
  FaWallet,
  FaUniversity,
} from "react-icons/fa";

import { FaArrowTrendUp } from "react-icons/fa6";

const formatCurrency = (value) => {
  if (value == null) return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatNumber = (value) => {
  if (value == null) return "N/A";

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercent = (value) => {
  if (value == null) return "N/A";

  return `${(value * 100).toFixed(2)}%`;
};

const badgeColor = (recommendation) => {
  switch (recommendation?.toUpperCase()) {
    case "BUY":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";

    case "SELL":
      return "bg-red-500/20 text-red-400 border-red-500/30";

    default:
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }
};

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { analysis: reduxAnalysis } = useSelector((state) => state.investment);

  const analysis = location.state?.analysisData || reduxAnalysis;

  console.log("Resolved Analysis:", analysis);

  if (!analysis) {

    if (user) {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/" replace />;

  }

  // Only show the failure page if the fundamental research data itself failed to load
  if (analysis.errors && analysis.errors.message) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-red-500">
          Analysis Failed
        </h1>

        <p className="mt-4 text-slate-400">
          {analysis.errors.message}
        </p>

        <button
          onClick={() => navigate(user ? "/dashboard" : "/")}
          className="mt-8 px-6 py-3 rounded-xl bg-emerald-500 text-black cursor-pointer"
        >
          Back
        </button>
      </div>
    );
  }

  const {
    company,
    market,
    financials,
    statistics,
    analyst,
    recommendation,
  } = analysis;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Back Button */}

      <button
        onClick={() => navigate(user ? "/dashboard" : "/")}
        className="flex items-center gap-3 text-slate-400 hover:text-white transition cursor-pointer"
      >
        <FaArrowLeft />
        Back to Dashboard
      </button>

      {/* Gemini API Quota limit warning */}
      {analysis.errors?.gemini && (
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-6 rounded-3xl text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <strong className="block font-bold text-lg">AI Rate Limit Exceeded</strong>
            <p className="mt-1 text-slate-400 text-xs leading-relaxed">
              Your Gemini API free tier daily quota (20 requests/day) has been reached. Showing complete financial sheets, news, and statistics instead of dynamic AI summaries.
            </p>
          </div>
          <button
            onClick={() => navigate(user ? "/dashboard" : "/")}
            className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 text-xs font-semibold rounded-xl transition flex-shrink-0 cursor-pointer"
          >
            Try Another Symbol
          </button>
        </div>
      )}

      {/* Header */}

      <div className="mt-8 bg-[#151A21] border border-white/10 rounded-3xl p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h1 className="text-5xl font-bold">
              {company.name}
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              {company.symbol} • {company.industry}
            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <div
              className={`px-6 py-3 rounded-2xl border font-semibold text-lg ${badgeColor(
                recommendation.recommendation
              )}`}
            >
              {recommendation.recommendation}
            </div>

            <div className="px-6 py-3 rounded-2xl bg-[#0D1117] border border-white/10">

              <p className="text-slate-400 text-sm">
                Confidence
              </p>

              <p className="text-xl font-bold">
                {recommendation.confidence}%
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 bg-[#151A21] border border-white/10 rounded-3xl p-8">

        <h2 className="text-2xl font-semibold mb-5">
          AI Summary
        </h2>

        <p className="text-slate-300 leading-8">
          {recommendation.summary}
        </p>

      </div>

      {/* Financial Overview */}

      <div className="mt-8">

        <h2 className="text-3xl font-bold mb-6">
          Financial Overview
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <FaDollarSign className="text-emerald-400 text-2xl mb-4" />

            <p className="text-slate-400">
              Revenue
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {formatCurrency(financials.revenue)}
            </h3>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <FaWallet className="text-cyan-400 text-2xl mb-4" />

            <p className="text-slate-400">
              Market Cap
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {formatCurrency(market.marketCap)}
            </h3>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <FaUniversity className="text-yellow-400 text-2xl mb-4" />

            <p className="text-slate-400">
              Cash
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {formatCurrency(financials.cash)}
            </h3>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <FaBuilding className="text-red-400 text-2xl mb-4" />

            <p className="text-slate-400">
              Total Debt
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {formatCurrency(financials.debt)}
            </h3>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <FaArrowTrendUp className="text-emerald-400 text-2xl mb-4" />

            <p className="text-slate-400">
              Profit Margin
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {formatPercent(financials.profitMargin)}
            </h3>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <FaChartLine className="text-blue-400 text-2xl mb-4" />

            <p className="text-slate-400">
              Free Cash Flow
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {formatCurrency(financials.freeCashFlow)}
            </h3>

          </div>

        </div>

      </div>

      {/* Market Overview */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Market Overview
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <p className="text-slate-400">
              Current Price
            </p>

            <h3 className="text-3xl font-bold mt-3">
              ${market.currentPrice}
            </h3>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <p className="text-slate-400">
              Previous Close
            </p>

            <h3 className="text-3xl font-bold mt-3">
              ${market.previousClose}
            </h3>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <p className="text-slate-400">
              P/E Ratio
            </p>

            <h3 className="text-3xl font-bold mt-3">
              {statistics.peRatio}
            </h3>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <p className="text-slate-400">
              EPS
            </p>

            <h3 className="text-3xl font-bold mt-3">
              {statistics.eps}
            </h3>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-white/10 p-6">

            <p className="text-slate-400">
              Beta
            </p>

            <h3 className="text-3xl font-bold mt-3">
              {statistics.beta}
            </h3>

          </div>

        </div>

      </div>

      {/* Analyst Recommendation */}

      <div className="mt-12 bg-[#151A21] rounded-3xl border border-white/10 p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Wall Street Analysts
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div>

            <p className="text-slate-400">
              Recommendation
            </p>

            <h3 className="text-3xl font-bold mt-2 text-emerald-400">
              {analyst.recommendation.toUpperCase()}
            </h3>

          </div>

          <div>

            <p className="text-slate-400">
              Rating Score
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {analyst.recommendationScore}
            </h3>

          </div>

          <div>

            <p className="text-slate-400">
              Analysts
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {analyst.analystCount}
            </h3>

          </div>

        </div>

      </div>

      {/* Latest News */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Latest News
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          {analysis.news?.map((item, index) => (

            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="bg-[#151A21] rounded-3xl border border-white/10 overflow-hidden hover:border-emerald-500 transition"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <h3 className="text-xl font-semibold line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-slate-400 mt-4 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex justify-between mt-6 text-sm text-slate-500">

                  <span>
                    {item.source}
                  </span>

                  <span>
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </span>

                </div>

              </div>

            </a>

          ))}

        </div>

      </div>

      {/* SWOT */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          SWOT Analysis
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-[#151A21] rounded-3xl border border-emerald-500/20 p-6">

            <h3 className="text-emerald-400 text-2xl font-semibold mb-4">
              Strengths
            </h3>

            <ul className="space-y-3">

              {recommendation.swot.strengths.map((item, index) => (
                <li key={index}>✅ {item}</li>
              ))}

            </ul>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-red-500/20 p-6">

            <h3 className="text-red-400 text-2xl font-semibold mb-4">
              Weaknesses
            </h3>

            <ul className="space-y-3">

              {recommendation.swot.weaknesses.map((item, index) => (
                <li key={index}>❌ {item}</li>
              ))}

            </ul>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-cyan-500/20 p-6">

            <h3 className="text-cyan-400 text-2xl font-semibold mb-4">
              Opportunities
            </h3>

            <ul className="space-y-3">

              {recommendation.swot.opportunities.map((item, index) => (
                <li key={index}>🚀 {item}</li>
              ))}

            </ul>

          </div>

          <div className="bg-[#151A21] rounded-3xl border border-yellow-500/20 p-6">

            <h3 className="text-yellow-400 text-2xl font-semibold mb-4">
              Threats
            </h3>

            <ul className="space-y-3">

              {recommendation.swot.threats.map((item, index) => (
                <li key={index}>⚠️ {item}</li>
              ))}

            </ul>

          </div>

        </div>

      </div>

      {/* Pros / Cons / Risks */}

      <div className="grid lg:grid-cols-3 gap-6 mt-12">

        <div className="bg-[#151A21] rounded-3xl border border-emerald-500/20 p-6">

          <h2 className="text-2xl font-semibold text-emerald-400 mb-5">
            Pros
          </h2>

          <ul className="space-y-3">

            {recommendation.pros.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}

          </ul>

        </div>

        <div className="bg-[#151A21] rounded-3xl border border-red-500/20 p-6">

          <h2 className="text-2xl font-semibold text-red-400 mb-5">
            Cons
          </h2>

          <ul className="space-y-3">

            {recommendation.cons.map((item, index) => (
              <li key={index}>❌ {item}</li>
            ))}

          </ul>

        </div>

        <div className="bg-[#151A21] rounded-3xl border border-yellow-500/20 p-6">

          <h2 className="text-2xl font-semibold text-yellow-400 mb-5">
            Risks
          </h2>

          <ul className="space-y-3">

            {recommendation.risks.map((item, index) => (
              <li key={index}>⚠️ {item}</li>
            ))}

          </ul>

        </div>

      </div>

    </div>
  );
};

export default Analysis;