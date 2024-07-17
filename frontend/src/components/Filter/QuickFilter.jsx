import React from "react";
import ProductSelector from "./ProductFilter";
import CityFilter from "./CityFilter";
import BrandFilter from "./brandFilter";
import ParkingFilter from "./ParkingFilter";
import MetroConnectivityFilter from "./MetroConnectivityFilter";
import { useDispatch } from "react-redux";
import { resetFilters } from "../../reducers/filterSlice";

const QuickFilters = ({ children }) => {
  const dispatch = useDispatch();
  const handleResetFilters = () => {
    dispatch(resetFilters());
   
  };
  return (
    <div className="ms-5">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Quick Filters
      </h1>
      <div className="grid grid-cols-5 gap-4 sm:flex-auto ">
        {/* First Column */}
        <div className="col-span-1">
          <ProductSelector />
        </div>

        {/* Second Column */}
        <div className="col-span-3">
          <div className="flex">
            <div>
              <CityFilter />
            </div>
            <div>
              <BrandFilter />
            </div>
            <div>
              <ParkingFilter />
            </div>
            <div>
              <MetroConnectivityFilter />
            </div>
          </div>
        </div>
        {/* Third Column */}
        <div className="col-span-1 flex justify-center items-start ms-10">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;
