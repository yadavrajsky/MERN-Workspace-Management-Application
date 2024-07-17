import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  selectedProductType: null,
  selectedCity: false,
  spaceType: false,
  selectedBrand: [],
  parking: false,
  metroConnectivity: false,
};

// Create filter slice
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.selectedProductType = null;
      state.selectedCity = false;
      state.spaceType = false;
      state.selectedBrand = [];
      state.parking = false;
      state.metroConnectivity = false;
    },
    updateProductType: (state, action) => {
      state.selectedProductType = action.payload;
    },
    updateCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    updateSpaceType: (state, action) => {
      state.spaceType = action.payload;
    },
    updateBrands: (state, action) => {
      state.selectedBrand = action.payload;
    },
    updateParking: (state, action) => {
      state.parking = action.payload;
    },
    updateMetroConnectivity: (state, action) => {
      state.metroConnectivity = action.payload;
    },
  },
});
export const {
  resetFilters,
  updateProductType,
  updateCity,
  updateSpaceType,
  updateBrands,
  updateParking,
  updateMetroConnectivity,
} = filterSlice.actions;
export default filterSlice.reducer;
