import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        company: {
            name: { type: String, required: true },
            symbol: { type: String, required: true },
            sector: { type: String },
            industry: { type: String },
            website: { type: String },
            description: { type: String },
            employees: { type: Number },
        },
        market: {
            currentPrice: { type: Number },
            previousClose: { type: Number },
            marketCap: { type: Number },
            exchange: { type: String },
            currency: { type: String },
        },
        financials: {
            revenue: { type: Number },
            cash: { type: Number },
            debt: { type: Number },
            freeCashFlow: { type: Number },
            operatingCashFlow: { type: Number },
            grossMargin: { type: Number },
            profitMargin: { type: Number },
        },
        statistics: {
            peRatio: { type: Number },
            eps: { type: Number },
            beta: { type: Number },
            pegRatio: { type: Number },
        },
        analyst: {
            recommendation: { type: String },
            recommendationScore: { type: Number },
            analystCount: { type: Number },
        },
        news: [
            {
                title: { type: String },
                description: { type: String },
                url: { type: String },
                image: { type: String },
                source: { type: String },
                publishedAt: { type: String },
            }
        ],
        recommendation: {
            recommendation: { type: String, required: true },
            confidence: { type: Number },
            investmentScore: { type: Number },
            riskLevel: { type: String },
            marketSentiment: { type: String },
            timeHorizon: { type: String },
            summary: { type: String },
            pros: [{ type: String }],
            cons: [{ type: String }],
            risks: [{ type: String }],
            actionItems: [{ type: String }],
            swot: {
                strengths: [{ type: String }],
                weaknesses: [{ type: String }],
                opportunities: [{ type: String }],
                threats: [{ type: String }],
            },
        },
        metadata: {
            source: { type: String },
            fetchedAt: { type: String },
        },
    },
    {
        timestamps: true,
    }
);

const Investment = mongoose.model("Investment", investmentSchema);

export default Investment;
