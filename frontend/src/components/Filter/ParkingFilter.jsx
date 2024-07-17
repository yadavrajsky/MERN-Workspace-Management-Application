import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateParking } from "../../reducers/filterSlice";

const ParkingFilter = () => {
  const dispatch = useDispatch();
  const {parking} = useSelector((state) => state.filter);

  const handleChange = () => {
    dispatch(updateParking(!parking));
  };

  return (
    <div className="relative p-4 max-w-sm mx-auto h-fit">
      <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        <input
          type="checkbox"
          id="parking"
          name="parking"
          checked={parking}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="parking"
          className="ml-3 text-sm text-gray-900 dark:text-gray-300 w-full"
        >
          Parking Available
        </label>
      </div>
    </div>
  );
};

export default ParkingFilter;
