import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for CRUD operations
export const fetchEquipment = createAsyncThunk(
  "equipment/fetchEquipment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/equipment");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchEquipmentById = createAsyncThunk(
  "equipment/fetchEquipmentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/equipment/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEquipment = createAsyncThunk(
  "equipment/createEquipment",
  async (equipmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/equipment", equipmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEquipment = createAsyncThunk(
  "equipment/updateEquipment",
  async ({ id, equipmentData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/equipment/${id}`,
        equipmentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEquipment = createAsyncThunk(
  "equipment/deleteEquipment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/equipment/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  equipment: [],
  selectedEquipment: null,
  loading: false,
  error: null,
  message: null,
};

// Create equipmentSlice
const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    resetNotificationState: (state) => {
      state.error = null;
      state.message = null;
    },
    setSelectedEquipment: (state, action) => {
      state.selectedEquipment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.equipment = action.payload.equipmentItems;
      })
      .addCase(fetchEquipment.rejected, (state, action) => {
        state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
      })
      .addCase(fetchEquipmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchEquipmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEquipment = action.payload.equipment;
      })
      .addCase(fetchEquipmentById.rejected, (state, action) => {
        state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
      })
      .addCase(createEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.equipment.push(action.payload.equipment);
      })
      .addCase(createEquipment.rejected, (state, action) => {
        state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
      })
      .addCase(updateEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
      })
      .addCase(deleteEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteEquipment.rejected, (state, action) => {
        state.loading = false;
                action.payload.success===false?state.error = action.payload.message:state.error = action.payload.error;
      });
  },
});

export const { resetNotificationState, setSelectedEquipment } =
  equipmentSlice.actions;

export default equipmentSlice.reducer;
