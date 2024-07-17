// Import your individual reducer files
import { combineReducers} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cityReducer from './citySlice'
import brandReducer from './brandSlice'
import amentyReducer from './amentySlice'
import equipmentReducer from './equipmentSlice';
import productTypeReducer from './productTypeSlice'
import filterReducer from './filterSlice';
import coworkingSpaceReducer from './coworkingSpaceSlice';
import fileUploadReducer from './fileUploadSlice';

// Combine your reducers into a root reducer
export  const rootReducer = combineReducers({
  auth: authReducer,
  city: cityReducer,
  brand:brandReducer,
  amenity:amentyReducer,
  equipment:equipmentReducer,
  productType:productTypeReducer,
  filter:filterReducer,
  coworkingSpaces: coworkingSpaceReducer,
  files: fileUploadReducer,
  // Add more reducers as needed
});
export default rootReducer;
