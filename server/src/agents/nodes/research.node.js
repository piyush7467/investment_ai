import yahooTool from "../tools/yahoo.tool.js";
import mapInvestmentData from "../../modules/investment/investment.mapper.js";

const researchNode = async (state) => {
    console.log("🔍 Research Node Running...");

    try {

        const yahooData = await yahooTool.getCompanyData(state.input);

        console.log("✅ Yahoo Finance Data Fetched");

        const mappedData = mapInvestmentData(yahooData);

        return {
            ...state,

            company: mappedData.company,

            market: mappedData.market,

            financials: mappedData.financials,

            statistics: mappedData.statistics,

            analyst: mappedData.analyst,

            metadata: {
                source: "Yahoo Finance",
                fetchedAt: new Date().toISOString(),
            },

            errors: null,
        };

    } catch (error) {

        console.error("❌ Research Node Error:", error.message);

        return {
            ...state,
            errors: {
                node: "Research Node",
                message: error.message,
            },
        };
    }
};

export default researchNode;