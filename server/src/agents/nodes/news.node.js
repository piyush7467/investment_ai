import newsTool from "../tools/news.tool.js";
import mapNews from "../../modules/investment/news.mapper.js";

const newsNode = async (state) => {

    console.log("📰 News Node Running...");

    try {

        const articles = await newsTool.getCompanyNews(
            state.company.name
        );

        return {

            ...state,

            news: mapNews(articles)

        };

    } catch (error) {

        console.error("News Node Error:", error.message);

        return {

            ...state,

            news: [],

            errors: {

                ...state.errors,

                news: error.message

            }

        };

    }

};

export default newsNode;