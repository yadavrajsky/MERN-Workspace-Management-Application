import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for CRUD operations
export const fetchProductTypes = createAsyncThunk(
  "productTypes/fetchProductTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/productTypes");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductTypeById = createAsyncThunk(
  "productTypes/fetchProductTypeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/productTypes/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProductType = createAsyncThunk(
  "productTypes/createProductType",
  async (productTypeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/productTypes",
        productTypeData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductType = createAsyncThunk(
  "productTypes/updateProductType",
  async ({ id, productTypeData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/productTypes/${id}`,
        productTypeData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductType = createAsyncThunk(
  "productTypes/deleteProductType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/productTypes/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  productTypes: [],
  selectedProductType: null,
  loading: false,
  error: null,
  message: null,
};

// Create productTypeSlice
const productTypeSlice = createSlice({
  name: "productTypes",
  initialState,
  reducers: {
    resetNotificationState: (state) => {
      state.error = null;
      state.message = null;
    },
    setSelectedProductType: (state, action) => {
      state.selectedProductType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchProductTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.productTypes = action.payload.productTypes;
      })
      .addCase(fetchProductTypes.rejected, (state, action) => {
        state.loading = false;
        action.payload.success === false
          ? (state.error = action.payload.message)
          : (state.error = action.payload.error);
      })
      .addCase(fetchProductTypeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchProductTypeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProductType = action.payload.productType;
      })
      .addCase(fetchProductTypeById.rejected, (state, action) => {
        state.loading = false;
        action.payload.success === false
          ? (state.error = action.payload.message)
          : (state.error = action.payload.error);
      })
      .addCase(createProductType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createProductType.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.productTypes.push(action.payload.productType);
      })
      .addCase(createProductType.rejected, (state, action) => {
        state.loading = false;
        action.payload.success === false
          ? (state.error = action.payload.message)
          : (state.error = action.payload.error);
      })
      .addCase(updateProductType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateProductType.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateProductType.rejected, (state, action) => {
        state.loading = false;
        action.payload.success === false
          ? (state.error = action.payload.message)
          : (state.error = action.payload.error);
      })
      .addCase(deleteProductType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteProductType.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteProductType.rejected, (state, action) => {
        state.loading = false;
        action.payload.success === false
          ? (state.error = action.payload.message)
          : (state.error = action.payload.error);
      });
  },
});

export const { resetNotificationState, setSelectedProductType } =
  productTypeSlice.actions;

export default productTypeSlice.reducer;
