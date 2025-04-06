import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/api";

export const fetchGallery = createAsyncThunk("gallery/fetch", async () => {
    const res = await axios.get(`${API_URL}/api/gallery`);
    return res.data;
});

const gallerySlice = createSlice({
    name: "gallery",
    initialState: { items: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGallery.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    },
});

export default gallerySlice.reducer;