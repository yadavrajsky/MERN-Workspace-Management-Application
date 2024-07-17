import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoworkingSpaces } from "../reducers/coworkingSpaceSlice";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { selectedProductType, selectedCity, selectedBrand, parking, metroConnectivity } = useSelector(
    (state) => state.filter
  );

  useEffect(() => {
    // Dispatch fetch action whenever search term or filters change
    dispatch(fetchCoworkingSpaces({ selectedProductType, selectedCity, selectedBrand, parking, metroConnectivity, search: searchTerm }));
  }, [dispatch, selectedProductType, selectedCity, selectedBrand, parking, metroConnectivity, searchTerm]);

  // Handle search term change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-96 mx-auto transition-all transform rounded-xl bg-gray-800">
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="input input-bordered w-full h-12 pr-4 placeholder-gray-400 border dark:bg-gray-700 dark:border-gray-600 dark:text-white pl-11 sm:text-sm rounded-lg border-gray-700 focus:border-gray-500 focus:ring-gray-500"
          placeholder="Search"
          role="combobox"
          aria-expanded="false"
          aria-controls="options"
          value={searchTerm} // Control the input value
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchComponent;
