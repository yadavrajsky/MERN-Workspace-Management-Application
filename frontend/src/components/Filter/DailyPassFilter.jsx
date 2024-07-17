import React, { useEffect } from "react";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import ProductFilter from "./ProductFilter";
import CityFilter from "./CityFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../reducers/citySlice";
import ProductSelector from "./ProductFilter";
function ContainerElement({ children }) {
  return <div className="h-full">{children}</div>;
}
const DailyPassFilter = ({isOpen,toggleDropdown}) => {
  const { cities } = useSelector(
    (state) => state.city
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch cities on component mount
    dispatch(fetchCities());
  }, [dispatch]);

  return (
    <Glider
      className="glider-container"
      draggable
      hasArrows
      hasDots={false}
      slidesToShow={3}
      containerElement={ContainerElement}
    >
      <div className="flex items-center justify-center h-screen">
        {/* <ProductSelector /> */}
        {/* <CityFilter cities={cities} isOpen={isOpen} toggleDropdown={toggleDropdown} /> */}
      </div>
      <div className="flex items-center justify-center">
        <span className="text-gray-900 dark:text-gray-100">2</span>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-gray-900 dark:text-gray-100">3</span>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-gray-900 dark:text-gray-100">4</span>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-gray-900 dark:text-gray-100">5</span>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-gray-900 dark:text-gray-100">6</span>
      </div>
    </Glider>
  );
};

export default DailyPassFilter;
