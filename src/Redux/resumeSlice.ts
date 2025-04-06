import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/api";

export const fetchResume = createAsyncThunk("resume/fetch", async () => {
    const res = await axios.get(`${API_URL}api/resume`);
    return res.data;
});

const resumeSlice = createSlice({
    name: "resume",
    initialState: { items: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResume.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    },
});

export default resumeSlice.reducer;