import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for CRUD operations
export const fetchAmenities = createAsyncThunk('amenities/fetchAmenities', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/v1/amenities');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchAmenityById = createAsyncThunk('amenities/fetchAmenityById', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/v1/amenities/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const createAmenity = createAsyncThunk('amenities/createAmenity', async (amenityData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/v1/amenities', amenityData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateAmenity = createAsyncThunk('amenities/updateAmenity', async ({ id, amenityData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/v1/amenities/${id}`, amenityData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteAmenity = createAsyncThunk('amenities/deleteAmenity', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/v1/amenities/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Initial state
const initialState = {
    amenities: [],
    selectedAmenity: null,
    loading: false,
    error: null,
    message: null
};

// Create amenitySlice
const amenitySlice = createSlice({
    name: 'amenities',
    initialState,
    reducers: {
        resetNotificationState: (state) => {
            state.error = null;
            state.message = null;
        },
        setSelectedAmenity: (state, action) => {
            state.selectedAmenity = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAmenities.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchAmenities.fulfilled, (state, action) => {
                state.loading = false;
                state.amenities = action.payload.amenities;
            })
            .addCase(fetchAmenities.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(fetchAmenityById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchAmenityById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedAmenity = action.payload.amenity;
            })
            .addCase(fetchAmenityById.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(createAmenity.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(createAmenity.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.amenities.push(action.payload.amenity);
            })
            .addCase(createAmenity.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(updateAmenity.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(updateAmenity.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(updateAmenity.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(deleteAmenity.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(deleteAmenity.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(deleteAmenity.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            });
    },
});

export const { resetNotificationState, setSelectedAmenity } = amenitySlice.actions;

export default amenitySlice.reducer;
