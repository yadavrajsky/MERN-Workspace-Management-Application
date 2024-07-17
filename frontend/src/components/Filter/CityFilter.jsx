import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../reducers/citySlice";
import { updateCity } from "../../reducers/filterSlice";
import Dropdown from "./DropDown";

const CityFilter = () => {
  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.city);
  const {selectedCity} = useSelector((state) => state.filter);
  const [chosenCity, setChosenCity] = useState(selectedCity);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch cities on component mount
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    // Select the first city by default if no city is selected in the filter state
    if (cities.length > 0 && !selectedCity) {
      dispatch(updateCity("all"));
    }
  }, [dispatch]);

  // Filter cities based on search input
  const filteredCities = cities.filter((city) =>
    city?.city?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

 const handleChosenCityChange = (cityId) => {
    setChosenCity(cityId);
    dispatch(updateCity(cityId));
  };

  return (
    <div className="relative p-4 max-w-sm mx-auto h-fit">
      <Dropdown title="City">
        <div className="space-y-2 p-3">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 mb-2 border rounded-lg w-full"
          />
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="radio"
              id="all"
              name="city"
              value="all"
              checked={chosenCity === "all"}
              onChange={() => handleChosenCityChange("all")}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="all"
              className="ml-3 text-sm text-gray-900 dark:text-gray-300 w-full"
            >
              All
            </label>
          </div>

          {filteredCities.map((city) => (
            <div
              key={city?._id?.toString()}
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <input
                type="radio"
                id={city?._id}
                name="city"
                value={city?._id}
                checked={chosenCity == city?._id}
                onChange={() => handleChosenCityChange(city?._id)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={city?._id}
                className="ml-3 text-sm text-gray-900 dark:text-gray-300 w-full"
              >
                {city?.city}
              </label>
            </div>
          ))}
          {filteredCities.length === 0 && (
            <div className="flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              No search results
            </div>
          )}
        </div>
      </Dropdown>
    </div>
  );
};

export default CityFilter;
