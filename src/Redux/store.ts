import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallerySlice";
import resumeReducer from "./gallerySlice";

export const store = configureStore({
    reducer: {
        gallery: galleryReducer,
        resume: resumeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
