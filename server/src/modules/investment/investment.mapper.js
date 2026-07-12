const mapInvestmentData = (data) => {

    return {

        company: {

            name: data.price.longName,

            symbol: data.price.symbol,

            sector: data.assetProfile.sector,

            industry: data.assetProfile.industry,

            website: data.assetProfile.website,

            description: data.assetProfile.longBusinessSummary,

            employees: data.assetProfile.fullTimeEmployees

        },

        market: {

            currentPrice: data.price.regularMarketPrice,

            previousClose: data.price.regularMarketPreviousClose,

            marketCap: data.price.marketCap,

            exchange: data.price.exchangeName,

            currency: data.price.currency

        },

        financials: {

            revenue: data.financialData.totalRevenue,

            cash: data.financialData.totalCash,

            debt: data.financialData.totalDebt,

            freeCashFlow: data.financialData.freeCashflow,

            operatingCashFlow: data.financialData.operatingCashflow,

            grossMargin: data.financialData.grossMargins,

            profitMargin: data.financialData.profitMargins

        },

        statistics: {

            peRatio: data.defaultKeyStatistics.forwardPE,

            eps: data.defaultKeyStatistics.forwardEps,

            beta: data.defaultKeyStatistics.beta,

            pegRatio: data.defaultKeyStatistics.pegRatio

        },

        analyst: {

            recommendation: data.financialData.recommendationKey,

            recommendationScore: data.financialData.recommendationMean,

            analystCount: data.financialData.numberOfAnalystOpinions

        }

    };

};

export default mapInvestmentData;