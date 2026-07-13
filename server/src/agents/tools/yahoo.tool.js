import YahooFinance from "yahoo-finance2";
import geminiTool from "./gemini.tool.js";

const yahooFinance = new YahooFinance();

class YahooTool {

    async getCompanyData(input) {
        if (!input) {
            throw new Error("Company name or symbol is required.");
        }

        const query = input.trim();
        let candidates = [query.toUpperCase()]; // start with user input symbol

        // 1. Try autocomplete lookup via Yahoo Search
        try {
            const searchResult = await yahooFinance.search(query);

            if (searchResult?.quotes && searchResult.quotes.length > 0) {
                // Sort quotes to prioritize EQUITY stock types
                const sortedQuotes = [...searchResult.quotes].sort((a, b) => {
                    const aIsEquity = a.quoteType === "EQUITY" ? 1 : 0;
                    const bIsEquity = b.quoteType === "EQUITY" ? 1 : 0;
                    return bIsEquity - aIsEquity;
                });

                // Extract symbols and push to candidate array, avoiding duplicates
                for (const quote of sortedQuotes) {
                    if (quote.symbol) {
                        const sym = quote.symbol.toUpperCase();
                        if (!candidates.includes(sym)) {
                            candidates.push(sym);
                        }
                    }
                }
            }
        } catch (error) {
            console.log("Yahoo autocomplete lookup failed:", error.message);
        }

        // 2. AI-Powered Fallback: If no candidate suggestions were found from Yahoo Search,
        // use Gemini to correct any spelling mistakes and suggest the correct ticker.
        if (candidates.length <= 1) {
            console.log("No autocomplete suggestions. Querying Gemini to correct spelling of query:", query);
            const corrected = await geminiTool.correctTicker(query);
            if (corrected && !candidates.includes(corrected)) {
                console.log("Gemini corrected query to ticker:", corrected);
                candidates.push(corrected);
            }
        }

        console.log("Candidate tickers resolved for lookup:", candidates);

        let lastError = null;

        // 3. Iterate candidates and return summary on first success
        for (const symbol of candidates) {
            try {
                console.log("Attempting to fetch Yahoo Finance summary for:", symbol);
                const result = await yahooFinance.quoteSummary(symbol, {
                    modules: [
                        "assetProfile",
                        "price",
                        "financialData",
                        "defaultKeyStatistics",
                    ],
                });

                // Verify we got valid price data
                if (result && result.price) {
                    console.log("✅ Successfully retrieved summary for:", symbol);
                    return result;
                }
            } catch (err) {
                console.log(`Failed for candidate ${symbol}:`, err.message);
                lastError = err;
            }
        }

        throw new Error(
            lastError?.message || `Could not find company details for "${input}". Please check symbol.`
        );
    }
}

export default new YahooTool();