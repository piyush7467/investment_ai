import api from "../../lib/axios";

export const analyzeCompany = async (company) => {

    const { data } = await api.post("/investment/analyze", {
        company,
    });

    return data;
};

export const getHistory = async () => {
    const { data } = await api.get("/investment/history");
    return data;
};