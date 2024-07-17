import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create async thunk for fetching all cities
export const fetchCities = createAsyncThunk('cities/fetchCities', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/v1/cities');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create async thunk for fetching a single city by ID
export const fetchCityById = createAsyncThunk('cities/fetchCityById', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/v1/cities/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create async thunk for creating a new city
export const createCity = createAsyncThunk('cities/createCity', async (cityData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/v1/cities', cityData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create async thunk for updating a city
export const updateCity = createAsyncThunk('cities/updateCity', async ({ id, cityData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/v1/cities/${id}`, cityData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create async thunk for deleting a city
export const deleteCity = createAsyncThunk('cities/deleteCity', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/v1/cities/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Initial state
const initialState = {
    cities: [],
    selectedCity: null,
    loading: false,
    error: null,
    message: null
};

// Create citySlice
const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        resetNotificationState: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload.cities;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(fetchCityById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchCityById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCity = action.payload.city;
            })
            .addCase(fetchCityById.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(createCity.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(createCity.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(createCity.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(updateCity.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(updateCity.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(updateCity.rejected, (state, action) => {
                state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
            })
            .addCase(deleteCity.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(deleteCity.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(deleteCity.rejected, (state, action) => {
                state.loading = false;
                action.payload.success==false?state.error = action.payload.message:state.error = action.payload.error;
            });
    },
});

export const { resetNotificationState } = citySlice.actions;

export default citySlice.reducer;
