import analysisGraph from "../../agents/graph/analysis.graph.js";
import Investment from "./investment.model.js";

class InvestmentService {

    async analyze(body, user) {

        const result = await analysisGraph.invoke({
            input: body.company,
        });

        if (user && result && !result.errors) {
            try {
                await Investment.create({
                    user: user._id,
                    company: result.company,
                    market: result.market,
                    financials: result.financials,
                    statistics: result.statistics,
                    analyst: result.analyst,
                    news: result.news,
                    recommendation: result.recommendation,
                    metadata: result.metadata,
                });
            } catch (dbError) {
                console.error("Error saving search history to database:", dbError.message);
            }
        }

        return result;

    }

    async getUserHistory(userId) {
        return await Investment.find({ user: userId }).sort({ createdAt: -1 });
    }

}

export default new InvestmentService();