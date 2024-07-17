import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../reducers/brandSlice";
import { updateBrands } from "../../reducers/filterSlice";
import Dropdown from "./DropDown";

const BrandFilter = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);
  const { selectedBrands } = useSelector((state) => state.filter);
  const [chosenBrands, setChosenBrands] = useState(selectedBrands || []);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch brands on component mount
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    // Sync chosenBrands with selectedBrands from Redux state
    setChosenBrands(selectedBrands || []);
  }, [selectedBrands]);

  // Filter brands based on search input
  const filteredBrands = brands.filter((brand) =>
    brand?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleChosenBrandChange = (brandId) => {
    let updatedBrands;
    if (chosenBrands.includes(brandId)) {
      updatedBrands = chosenBrands.filter((id) => id !== brandId);
    } else {
      updatedBrands = [...chosenBrands, brandId];
    }
    setChosenBrands(updatedBrands);
    dispatch(updateBrands(updatedBrands));
  };

  return (
    <div className="relative p-4 max-w-sm mx-auto h-fit">
      <Dropdown title="Brand">
        <div className="space-y-2 p-3">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 mb-2 border rounded-lg w-full"
          />
          {brands.length > 0 && (
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              id="all"
              name="brand"
              value="all"
              checked={chosenBrands.length === brands.length}
              onChange={() => {
                if (chosenBrands.length === brands.length) {
                  setChosenBrands([]);
                  dispatch(updateBrands([]));
                } else {
                  const allBrandIds = brands.map((brand) => brand._id);
                  setChosenBrands(allBrandIds);
                  dispatch(updateBrands(allBrandIds));
                }
              }}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="all"
              className="ml-3 text-sm text-gray-900 dark:text-gray-300 w-full"
            >
              All
            </label>
          </div>
          )}

          {filteredBrands.map((brand) => (
            <div
              key={brand?._id?.toString()}
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <input
                type="checkbox"
                id={brand?._id}
                name="brand"
                value={brand?._id}
                checked={chosenBrands.includes(brand?._id)}
                onChange={() => handleChosenBrandChange(brand?._id)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={brand?._id}
                className="ml-3 text-sm text-gray-900 dark:text-gray-300 w-full"
              >
                {brand?.name}
              </label>
            </div>
          ))}
          {filteredBrands.length === 0 && (
            <div className="flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              No search results
            </div>
          )}
        </div>
      </Dropdown>
    </div>
  );
};

export default BrandFilter;
