import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

class YahooTool {

    async getCompanyData(input) {

        if (!input) {
            throw new Error("Company name or symbol is required.");
        }

        let symbol = input.trim().toUpperCase();

        try {
            // If the user entered a company name (Apple, Tesla, etc.),
            // search Yahoo Finance to find its ticker.
            const searchResult = await yahooFinance.search(input);

            if (
                searchResult?.quotes &&
                searchResult.quotes.length > 0
            ) {
                symbol = searchResult.quotes[0].symbol;
            }
        } catch (error) {
            // Ignore search failure and fall back to the user's input.
            console.log("Yahoo search failed, using input as symbol.");
        }

        console.log("Fetching Yahoo Finance data for:", symbol);

        const result = await yahooFinance.quoteSummary(symbol, {
            modules: [
                "assetProfile",
                "price",
                "financialData",
                "defaultKeyStatistics",
            ],
        });

        return result;
    }
}

export default new YahooTool();