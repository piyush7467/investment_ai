import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

class GeminiTool {

    constructor() {

        const apiKey =
            process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error(
                "GOOGLE_API_KEY or GEMINI_API_KEY is missing in .env"
            );
        }

        this.ai = new GoogleGenAI({
            apiKey,
        });
    }

    async analyzeInvestment(data) {

        // Send only important information to Gemini
        const aiData = {

            company: {
                name: data.company.name,
                symbol: data.company.symbol,
                sector: data.company.sector,
                industry: data.company.industry,
                employees: data.company.employees,
            },

            market: data.market,

            financials: data.financials,

            statistics: data.statistics,

            analyst: data.analyst,

            news: data.news
                .slice(0, 5)
                .map(article => ({
                    title: article.title,
                    description: article.description,
                })),
        };

        const prompt = `
You are a Senior Investment Analyst.

Analyze the company using the provided financial data, analyst ratings, and recent news.

Rules:
- Return ONLY valid JSON.
- Do NOT wrap the response inside markdown.
- Do NOT use \`\`\`json.
- Do NOT explain anything outside JSON.
- The first character must be {
- The last character must be }

Investment Data:

${JSON.stringify(aiData, null, 2)}

Return EXACTLY this JSON structure:

{
  "recommendation": "BUY | HOLD | SELL",
  "confidence": 0,
  "investmentScore": 0,
  "riskLevel": "Low | Medium | High",
  "marketSentiment": "Bullish | Neutral | Bearish",
  "timeHorizon": "Short Term | Medium Term | Long Term",
  "summary": "",
  "pros": [],
  "cons": [],
  "risks": [],
  "actionItems": [],
  "swot": {
    "strengths": [],
    "weaknesses": [],
    "opportunities": [],
    "threats": []
  }
}
`;

        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",

            contents: prompt,

            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        recommendation: { type: "STRING" },
                        confidence: { type: "INTEGER" },
                        investmentScore: { type: "INTEGER" },
                        riskLevel: { type: "STRING" },
                        marketSentiment: { type: "STRING" },
                        timeHorizon: { type: "STRING" },
                        summary: { type: "STRING" },
                        pros: { type: "ARRAY", items: { type: "STRING" } },
                        cons: { type: "ARRAY", items: { type: "STRING" } },
                        risks: { type: "ARRAY", items: { type: "STRING" } },
                        actionItems: { type: "ARRAY", items: { type: "STRING" } },
                        swot: {
                            type: "OBJECT",
                            properties: {
                                strengths: { type: "ARRAY", items: { type: "STRING" } },
                                weaknesses: { type: "ARRAY", items: { type: "STRING" } },
                                opportunities: { type: "ARRAY", items: { type: "STRING" } },
                                threats: { type: "ARRAY", items: { type: "STRING" } }
                            },
                            required: ["strengths", "weaknesses", "opportunities", "threats"]
                        }
                    },
                    required: [
                        "recommendation",
                        "confidence",
                        "investmentScore",
                        "riskLevel",
                        "marketSentiment",
                        "timeHorizon",
                        "summary",
                        "pros",
                        "cons",
                        "risks",
                        "actionItems",
                        "swot"
                    ]
                },
                temperature: 0.2,
            },
        });

        return response.text;
    }

    async correctTicker(query) {
        try {
            const prompt = `
You are a financial symbol correction tool.
Correct the following company name or stock symbol to its official stock ticker symbol.
If the symbol is from a non-US market (like India), append the appropriate extension (e.g. .NS for National Stock Exchange of India, .BO for Bombay Stock Exchange).

Input: ${query}

Return ONLY the official uppercase ticker symbol (e.g. NVDA, AAPL, MSFT, RELIANCE.NS, TSLA). Do not include any explanation or markdown formatting.
`;

            const response = await this.ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    temperature: 0.1,
                }
            });

            return response.text ? response.text.trim().toUpperCase() : null;
        } catch (error) {
            console.error("Gemini ticker correction failed:", error.message);
            return null;
        }
    }
}

export default new GeminiTool();