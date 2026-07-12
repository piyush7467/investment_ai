const parseGeminiJson = (text) => {

    if (!text) {
        throw new Error("Gemini returned an empty response.");
    }

    let cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    try {
        return JSON.parse(cleaned);
    } catch (parseError) {
        console.warn("⚠️ Initial JSON parse failed. Attempting advanced cleanup for control characters...");
        
        try {
            // Replace literal newlines, carriage returns, and tabs within double-quoted strings
            cleaned = cleaned.replace(/"([^"]*)"/g, (match, p1) => {
                return (
                    '"' +
                    p1
                        .replace(/\n/g, "\\n")
                        .replace(/\r/g, "\\r")
                        .replace(/\t/g, "\\t") +
                    '"'
                );
            });
            return JSON.parse(cleaned);
        } catch (retryError) {
            console.error("❌ Advanced JSON parse cleanup failed:", retryError.message);
            throw parseError; // throw original syntax error so it gets caught by decision agent
        }
    }
};

export default parseGeminiJson;