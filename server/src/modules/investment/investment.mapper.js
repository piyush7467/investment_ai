const mapInvestmentData = (data) => {
    return {
        company: {
            name: data?.price?.longName || data?.price?.shortName || data?.price?.symbol || "Unknown Company",
            symbol: data?.price?.symbol || "UNKNOWN",
            sector: data?.assetProfile?.sector || "N/A",
            industry: data?.assetProfile?.industry || "N/A",
            website: data?.assetProfile?.website || "N/A",
            description: data?.assetProfile?.longBusinessSummary || "No description available.",
            employees: data?.assetProfile?.fullTimeEmployees || 0
        },

        market: {
            currentPrice: data?.price?.regularMarketPrice || null,
            previousClose: data?.price?.regularMarketPreviousClose || null,
            marketCap: data?.price?.marketCap || null,
            exchange: data?.price?.exchangeName || "N/A",
            currency: data?.price?.currency || "USD"
        },

        financials: {
            revenue: data?.financialData?.totalRevenue || null,
            cash: data?.financialData?.totalCash || null,
            debt: data?.financialData?.totalDebt || null,
            freeCashFlow: data?.financialData?.freeCashflow || null,
            operatingCashFlow: data?.financialData?.operatingCashflow || null,
            grossMargin: data?.financialData?.grossMargins || null,
            profitMargin: data?.financialData?.profitMargins || null
        },

        statistics: {
            peRatio: data?.defaultKeyStatistics?.forwardPE || null,
            eps: data?.defaultKeyStatistics?.forwardEps || null,
            beta: data?.defaultKeyStatistics?.beta || null,
            pegRatio: data?.defaultKeyStatistics?.pegRatio || null
        },

        analyst: {
            recommendation: data?.financialData?.recommendationKey || "N/A",
            recommendationScore: data?.financialData?.recommendationMean || null,
            analystCount: data?.financialData?.numberOfAnalystOpinions || 0
        }
    };
};

export default mapInvestmentData;