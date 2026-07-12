import { Annotation } from "@langchain/langgraph";

const AnalysisState = Annotation.Root({

    input: Annotation(),

    company: Annotation(),

    market: Annotation(),

    financials: Annotation(),

    statistics: Annotation(),

    analyst: Annotation(),

    news: Annotation(),

    recommendation: Annotation(),

    metadata: Annotation(),

    errors: Annotation()

});

export default AnalysisState;