import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMetroConnectivity } from "../../reducers/filterSlice";

const MetroConnectivityFilter = () => {
  const dispatch = useDispatch();
  const metroConnectivity = useSelector((state) => state.filter.metroConnectivity);

  const handleChange = () => {
    dispatch(updateMetroConnectivity(!metroConnectivity));
  };

  return (
    <div className="relative p-4 max-w-sm mx-auto h-fit">
      <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        <input
          type="checkbox"
          id="metroConnectivity"
          name="metroConnectivity"
          checked={metroConnectivity}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="metroConnectivity"
          className="ml-3 text-sm text-gray-900 dark:text-gray-300 w-full"
        >
          Metro Connectivity
        </label>
      </div>
    </div>
  );
};

export default MetroConnectivityFilter;
