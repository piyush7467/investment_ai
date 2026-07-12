import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    analysis: null,
    loading: false,
    error: null,
    history: [],
};

const investmentSlice = createSlice({
    name: "investment",

    initialState,

    reducers: {

        analysisStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        analysisSuccess: (state, action) => {
            state.loading = false;
            state.analysis = action.payload;
        },

        analysisFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearAnalysis: (state) => {
            state.analysis = null;
            state.error = null;
            state.loading = false;
        },

        setHistoryList: (state, action) => {
            state.history = action.payload;
        },

    },
});

export const {
    analysisStart,
    analysisSuccess,
    analysisFailure,
    clearAnalysis,
    setHistoryList,
} = investmentSlice.actions;

export default investmentSlice.reducer;