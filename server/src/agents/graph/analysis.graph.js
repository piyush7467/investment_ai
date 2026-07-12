import { StateGraph, START, END } from "@langchain/langgraph";

import AnalysisState from "../state/analysis.state.js";

import researchNode from "../nodes/research.node.js";
import newsNode from "../nodes/news.node.js";
import decisionNode from "../nodes/decision.node.js";

const graph = new StateGraph(AnalysisState);

// Register Nodes
graph.addNode("researchAgent", researchNode);
graph.addNode("newsAgent", newsNode);
graph.addNode("decisionAgent", decisionNode);

// Connect Nodes
graph.addEdge(START, "researchAgent");
graph.addEdge("researchAgent", "newsAgent");
graph.addEdge("newsAgent", "decisionAgent");
graph.addEdge("decisionAgent", END);

const analysisGraph = graph.compile();

export default analysisGraph;