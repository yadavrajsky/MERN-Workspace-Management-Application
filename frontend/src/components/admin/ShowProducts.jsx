import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoworkingSpace, fetchCoworkingSpaces, resetNotificationState } from "../../reducers/coworkingSpaceSlice";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import {
  FaEdit,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaParking,
  FaTools,
  FaTrash,
} from "react-icons/fa";
import { MdSubway } from 'react-icons/md';
import { notifyError, notifyMessage } from "../../utils/notify";
import { Link } from "react-router-dom";

const ShowProducts = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { coworkingSpaces, loading, error, message } = useSelector(
    (state) => state.coworkingSpaces
  );
  const { selectedProductType,selectedCity,selectedBrand,parking,metroConnectivity} = useSelector(
    (state) => state.filter
  );
const handleDeleteSpace=(id)=>{
dispatch(deleteCoworkingSpace(id)) ;
}

  useEffect(() => {
    dispatch(fetchCoworkingSpaces({selectedProductType,selectedBrand,parking,metroConnectivity}));
  }, [dispatch,selectedProductType,selectedCity,selectedBrand,parking,metroConnectivity]);

  useEffect(() => {
    if (error) {
      notifyError("Error", error);
      dispatch(resetNotificationState());
    }
    if (message) {
      notifyMessage("Success", message);
      dispatch(resetNotificationState());
      dispatch(fetchCoworkingSpaces());
    }
  }, [error, message, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {coworkingSpaces.map((space) => (
          <div
            key={space?._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-xs border dark:border-gray-400"
          >
            <Glider
              draggable
              hasArrows
              hasDots
              slidesToShow={1}
              slidesToScroll={1}
              className="glider-container"
            >
              {space?.photos?.length > 0 ? (
                space.photos.map((photo) => (
                  <div key={photo?._id} className="glider-slide">
                    <img
                      className="w-full h-48 object-cover rounded-t-lg"
                      src={photo.url}
                      alt={space.name}
                    />
                  </div>
                ))
              ) : (
                <div className="glider-slide flex items-center justify-center h-48 bg-gray-200">
                  <img
                    className="w-full h-full object-cover"
                    src="/path/to/placeholder-image.jpg"
                    alt="Placeholder"
                  />
                </div>
              )}
            </Glider>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {space?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center">
                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400 mr-2" />
                {space?.location?.locality}, {space?.location?.city?.city}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center">
                <FaMoneyBillWave className="text-gray-500 dark:text-gray-400 mr-2" />
                {space?.creditsPerDeskPerMonth} Credits /Desk /Month
              </p>
              {space?.amenities?.length > 0 && (
                <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center">
                  <FaTools className="text-gray-500 dark:text-gray-400 mr-2" />
                  {space?.amenities.map(amenity => amenity?.name).join(', ')}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center">
                <FaParking className="text-gray-500 dark:text-gray-400 mr-2" />
                {space?.supportsParking ? "Yes" : "No"}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center">
                <MdSubway className="text-gray-500 dark:text-gray-400 mr-2" />
                {space?.supportsMetroConnectivity ? "Yes" : "No"}
              </p>
              {isAdmin && (
                <div className="mt-4 flex gap-2  items-center justify-center">
                  <Link to={`/admin/products/update/${space?._id}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center gap-1">
                    <FaEdit />
                  </Link>
                  <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center gap-1" onClick={()=>handleDeleteSpace(space?._id)}>
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
        {coworkingSpaces.length === 0 && ( <div className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100 flex justify-center items-center">No Result Found</div>)}
    </div>
  );
};

export default ShowProducts;
