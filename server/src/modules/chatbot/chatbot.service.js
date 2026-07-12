import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

class ChatbotService {
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

    async chat(message, history = [], companyContext = null) {
        let systemInstruction = `You are a helpful, professional, and knowledgeable AI Investment Assistant for InvestmentAI, a premium investment platform.
Your purpose is to answer stock-market, valuation, and general financial research questions.
Be concise, smart, and direct in your responses. Keep responses under 3-4 paragraphs unless the user requests detailed explanations. Make sure to use clean bullet points or lists for numbers where appropriate.`;

        if (companyContext) {
            systemInstruction += `\n\nCurrently, the user is viewing/analyzing this company:
Company Name: ${companyContext.company?.name || "N/A"}
Symbol: ${companyContext.company?.symbol || "N/A"}
Sector: ${companyContext.company?.sector || "N/A"}
Industry: ${companyContext.company?.industry || "N/A"}
Market Cap: ${companyContext.market?.marketCap || "N/A"}
Current Price: ${companyContext.market?.currentPrice || "N/A"}
AI Recommendation: ${companyContext.recommendation?.recommendation || "HOLD"} (Confidence: ${companyContext.recommendation?.confidence || 0}%, Risk: ${companyContext.recommendation?.riskLevel || "Medium"})
AI Summary of Company: ${companyContext.recommendation?.summary || "N/A"}
SWOT Strengths: ${(companyContext.recommendation?.swot?.strengths || []).join(", ")}
SWOT Weaknesses: ${(companyContext.recommendation?.swot?.weaknesses || []).join(", ")}

Use this context to answer questions specifically about this company if they ask. Do not mention the context if the user asks a completely unrelated general question.`;
        }

        // Format contents
        const contents = [];

        // Build history array formatted for Google GenAI SDK
        if (Array.isArray(history)) {
            for (const msg of history) {
                contents.push({
                    role: msg.role === "user" ? "user" : "model",
                    parts: [{ text: msg.text || msg.parts?.[0]?.text || "" }],
                });
            }
        }

        // Add the current query
        contents.push({
            role: "user",
            parts: [{ text: message }],
        });

        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: {
                systemInstruction,
                temperature: 0.7,
            },
        });

        return response.text;
    }
}

export default new ChatbotService();
