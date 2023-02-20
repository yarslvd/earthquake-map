import { configureStore } from "@reduxjs/toolkit";
import { earthquakeApi } from "./earthquakeApi";

export default configureStore({
    reducer: {
        [earthquakeApi.reducerPath]: earthquakeApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(earthquakeApi.middleware)
});