import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create async thunk for fetching all brands
export const fetchBrands = createAsyncThunk('brands/fetchBrands', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/v1/brands');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create async thunk for fetching a single brand by ID
export const fetchBrandById = createAsyncThunk('brands/fetchBrandById', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/v1/brands/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create async thunk for creating a new brand
export const createBrand = createAsyncThunk('brands/createBrand', async (brandData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/v1/brands', brandData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create async thunk for updating a brand
export const updateBrand = createAsyncThunk('brands/updateBrand', async ({ id, brandData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/v1/brands/${id}`, brandData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create async thunk for deleting a brand
export const deleteBrand = createAsyncThunk('brands/deleteBrand', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/v1/brands/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Initial state
const initialState = {
    brands: [],
    selectedBrand: null,
    loading: false,
    error: null,
    message: null
};

// Create brandSlice
const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        resetNotificationState: (state) => {
            state.error = null;
            state.message = null;
        },
        setSelectedBrand: (state, action) => {
            state.selectedBrand = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload.brands;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(fetchBrandById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchBrandById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBrand = action.payload.brand;
            })
            .addCase(fetchBrandById.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(createBrand.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(updateBrand.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(deleteBrand.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            });
    },
});

export const { resetNotificationState, setSelectedBrand } = brandSlice.actions;

export default brandSlice.reducer;
