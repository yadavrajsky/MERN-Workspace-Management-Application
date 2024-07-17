import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { removePhotoFromDraftCoworkingSpace, updateDraftCoworkingSpaceFiles } from './coworkingSpaceSlice';

// Async thunk for file upload
export const uploadFiles = createAsyncThunk(
  'files/uploadFiles',
  async (formData, { dispatch,rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

          // Dispatch action to update coworkingSpace with the new photos
          dispatch(updateDraftCoworkingSpaceFiles({
            photos: response.data.files, 
          }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for file deletion
export const deleteFile = createAsyncThunk(
  'files/deleteFile',
  async (fileId, { dispatch,rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/file/delete/${fileId}`);
      dispatch(removePhotoFromDraftCoworkingSpace(fileId));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
    uploadedFilesList: [],
  loading: false,
  error: null,
  message: null,
  deletedFileId: null,
};

// Create fileUploadSlice
const fileUploadSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    resetNotificationState: (state) => {
        state.error = null;
        state.message = null;
    },
    removeDeletedFileId: (state) => {
        state.deletedFileId = null;
    },
    removeUploadedFileList: (state) => {
        state.uploadedFilesList = [];
    },
    updateUploadedFileList: (state, action) => {
        state.uploadedFilesList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedFilesList = [];
        state.message = action.payload.message;
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.success === false ? action.payload.message : action.payload.error;
      })
      .addCase(deleteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.uploadedFilesList = state.uploadedFilesList.filter(
          (file) => file.id !== action.payload.deletedFileId
        );
        state.deletedFileId= action.payload.deletedFileId;
        //update the draftCoworkingSpace state here
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.success === false ? action.payload.message : action.payload.error;
      });
  },
});

export const { resetNotificationState,removeDeletedFileId,removeUploadedFileList,updateUploadedFileList } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
