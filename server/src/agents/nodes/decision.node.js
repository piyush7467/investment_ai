import geminiTool from "../tools/gemini.tool.js";
import parseGeminiJson from "../../utils/parseGeminiJson.js";

const decisionNode = async (state) => {

    console.log("🤖 Decision Agent Running...");

    try {

        let response = await geminiTool.analyzeInvestment({
            company: state.company,
            market: state.market,
            financials: state.financials,
            statistics: state.statistics,
            analyst: state.analyst,
            news: state.news,
        });

        console.log("Gemini Raw Response:\n", response);

        let recommendation;

        try {

            recommendation = parseGeminiJson(response);

        } catch (parseError) {

            console.log("⚠️ Invalid JSON from Gemini. Retrying...");

            response = await geminiTool.analyzeInvestment({
                company: state.company,
                market: state.market,
                financials: state.financials,
                statistics: state.statistics,
                analyst: state.analyst,
                news: state.news,
            });

            console.log("Gemini Retry Response:\n", response);

            recommendation = parseGeminiJson(response);
        }

        return {
            ...state,
            recommendation,
        };

    } catch (error) {

        console.error("Gemini Decision Error:", error);

        return {
            ...state,

            recommendation: {
                recommendation: "HOLD",
                confidence: 0,
                investmentScore: 0,
                riskLevel: "Unknown",
                marketSentiment: "Neutral",
                timeHorizon: "Long Term",
                summary:
                    "AI recommendation could not be generated. Please try again.",

                pros: [],
                cons: [],
                risks: [],
                actionItems: [],

                swot: {
                    strengths: [],
                    weaknesses: [],
                    opportunities: [],
                    threats: [],
                },
            },

            errors: {
                ...state.errors,
                gemini: error.message,
            },
        };
    }
};

export default decisionNode;