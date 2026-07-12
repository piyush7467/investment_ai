import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/auth.slice";
import investmentReducer from "../features/investment/investment.slice";

export const store = configureStore({

    reducer: {

        auth: authReducer,
        investment: investmentReducer,

    },

});