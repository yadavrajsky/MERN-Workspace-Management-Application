import React, { useEffect, useState } from "react";
import { fetchProductTypes } from "../../../reducers/productTypeSlice";
import { fetchCities } from "../../../reducers/citySlice";
import { fetchBrands } from "../../../reducers/brandSlice";
import { fetchAmenities } from "../../../reducers/amentySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDraftCoworkingSpace,
  resetNotificationState,
  updateCoworkingSpace,
  updateDraftCoworkingSpace,
} from "../../../reducers/coworkingSpaceSlice";
import { notifyError, notifyMessage } from "../../../utils/notify";
import { useParams } from "react-router-dom";

const ChooseProductType = ({ isEdit }) => {
  const {id} =useParams();
  const [propertyName, setPropertyName] = useState("");
  const [productType, setProductType] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [brand, setBrand] = useState("");
  const [creditsPerDeskPerMonth, setCreditsPerDeskPerMonth] = useState("");
  const [supportsParking, setSupportsParking] = useState(false);
  const [supportsMetroConnectivity, setSupportsMetroConnectivity] =
    useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { productTypes } = useSelector((state) => state.productType);
  const { cities } = useSelector((state) => state.city);
  const { brands } = useSelector((state) => state.brand);
  const { amenities } = useSelector((state) => state.amenity);

  const draftCoworkingSpace = useSelector(
    (state) => state.coworkingSpaces.draftCoworkingSpace
  );
  const { error, message, loading } = useSelector(
    (state) => state.coworkingSpaces
  );

  const handlePropertyNameChange = (e) => {
    setPropertyName(e.target.value);
  };

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleLocalityChange = (e) => {
    setLocality(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleCreditsChange = (e) => {
    setCreditsPerDeskPerMonth(e.target.value);
  };

  const handleSupportsParkingChange = (e) => {
    setSupportsParking(e.target.checked);
  };

  const handleSupportsMetroConnectivityChange = (e) => {
    setSupportsMetroConnectivity(e.target.checked);
  };

  const handleAmenityChange = (e) => {
    const amenityId = e.target.value;
    if (e.target.checked) {
      setSelectedAmenities((prevSelectedAmenities) => {
        const updatedSelectedAmenities = new Set(prevSelectedAmenities);
        updatedSelectedAmenities.add(amenityId);
        return Array.from(updatedSelectedAmenities);
      });
    } else {
      setSelectedAmenities((prevSelectedAmenities) => {
        const updatedSelectedAmenities = new Set(prevSelectedAmenities);
        updatedSelectedAmenities.delete(amenityId);
        return Array.from(updatedSelectedAmenities);
      });
    }
  };

  const filteredAmenities = amenities.filter((amenity) =>
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDiscard = () => {
    dispatch(resetDraftCoworkingSpace());
  };

  useEffect(() => {
    dispatch(fetchProductTypes());
    dispatch(fetchCities());
    dispatch(fetchBrands());
    dispatch(fetchAmenities());
  }, [dispatch]);

  const handleNext = (e) => {
    e.preventDefault();
    if (draftCoworkingSpace?.stage < 2) {
      if (isEdit) {
        const updatedDraftCoworkingSpace = {
          name: propertyName,
          productType,
          location: {
            city,
            locality,
          },
          brand,
          creditsPerDeskPerMonth,
          supportsParking,
          supportsMetroConnectivity,
          amenities: selectedAmenities,
          stage: 2,
        };
        dispatch(updateCoworkingSpace({ id, updatedDraftCoworkingSpace }));
      } else {
        dispatch(
          updateDraftCoworkingSpace({
            ...draftCoworkingSpace,
            propertyName,
            productType,
            location: {
              city,
              locality,
            },
            brand,
            creditsPerDeskPerMonth,
            supportsParking,
            supportsMetroConnectivity,
            amenities: selectedAmenities,
            stage: draftCoworkingSpace?.stage + 1,
          })
        );
      }
    }
  };
  const handlePrev = () => {
    if (draftCoworkingSpace.stage > 1) {
      dispatch(
        updateDraftCoworkingSpace({
          ...draftCoworkingSpace,
          propertyName,
          productType,
          location: {
            city,
            locality,
          },
          brand,
          creditsPerDeskPerMonth,
          supportsParking,
          supportsMetroConnectivity,
          amenities: selectedAmenities,
        })
      );
    }
  };

  useEffect(() => {
    if (draftCoworkingSpace) {
      if (isEdit) {
        setPropertyName(draftCoworkingSpace?.name || "");
      } else {
        setPropertyName(draftCoworkingSpace?.propertyName || "");
      }
      setProductType(draftCoworkingSpace?.productType || "");
      setCity(draftCoworkingSpace?.location?.city || "");
      setLocality(draftCoworkingSpace?.location?.locality || "");
      if (isEdit) {
        setBrand(draftCoworkingSpace?.brand?._id || "");
      } else setBrand(draftCoworkingSpace?.brand || "");
      setCreditsPerDeskPerMonth(
        draftCoworkingSpace?.creditsPerDeskPerMonth || ""
      );
      setSupportsParking(draftCoworkingSpace?.supportsParking || false);
      setSupportsMetroConnectivity(
        draftCoworkingSpace?.supportsMetroConnectivity || false
      );
      setSelectedAmenities(draftCoworkingSpace?.amenities || []);
    }
  }, [draftCoworkingSpace]);

  useEffect(() => {
    if (error) {
      notifyError("Error", error);
      dispatch(resetNotificationState());
    }
    if (message) {
      notifyMessage("Success", message);
      dispatch(resetNotificationState());
      dispatch(updateDraftCoworkingSpace({...draftCoworkingSpace, stage: 2}));
    }
  }, [error, message, dispatch]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
      <form>
        <h1 className="text-2xl font-semibold mb-4 text-center">
          New Property
        </h1>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1 dark:text-gray-300"
              htmlFor="propertyName"
            >
              Property Name
            </label>
            <input
              id="propertyName"
              type="text"
              placeholder="Enter property name"
              required
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 dark:text-gray-200"
              onChange={handlePropertyNameChange}
              value={propertyName}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1 dark:text-gray-300"
              htmlFor="productType"
            >
              Product Type
            </label>
            <select
              id="productType"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 dark:text-gray-200 max-h-32 overflow-auto"
              onChange={handleProductTypeChange}
              value={productType}
              required
            >
              <option value="" disabled>
                Select a product type
              </option>
              {productTypes.map((type) => (
                <option key={type?._id} value={type?._id}>
                  {type?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1 dark:text-gray-300"
              htmlFor="city"
            >
              City
            </label>
            <select
              id="city"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 dark:text-gray-200 max-h-32 overflow-auto"
              onChange={handleCityChange}
              required
              value={city}
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((city) => (
                <option key={city?._id} value={city?._id}>
                  {city?.city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1 dark:text-gray-300"
              htmlFor="locality"
            >
              Locality
            </label>
            <input
              id="locality"
              type="text"
              placeholder="Enter locality"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 dark:text-gray-200"
              onChange={handleLocalityChange}
              value={locality}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1 dark:text-gray-300"
              htmlFor="brand"
            >
              Brand (Optional)
            </label>
            <select
              id="brand"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 dark:text-gray-200 max-h-32 overflow-auto"
              onChange={handleBrandChange}
              value={brand}
            >
              <option value="">None</option>
              {brands.map((brand) => (
                <option key={brand?._id} value={brand?._id}>
                  {brand?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1 dark:text-gray-300"
              htmlFor="creditsPerDeskPerMonth"
            >
              Credits Per Desk Per Month
            </label>
            <input
              id="creditsPerDeskPerMonth"
              type="number"
              placeholder="Enter credits"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 dark:text-gray-200"
              onChange={handleCreditsChange}
              value={creditsPerDeskPerMonth}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={supportsParking}
                onChange={handleSupportsParkingChange}
                className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-800 dark:border-gray-600"
              />
              <span className="text-sm font-medium dark:text-gray-300">
                Supports Parking
              </span>
            </label>

            <label className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={supportsMetroConnectivity}
                onChange={handleSupportsMetroConnectivityChange}
                className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-800 dark:border-gray-600"
              />
              <span className="text-sm font-medium dark:text-gray-300">
                Supports Metro Connectivity
              </span>
            </label>
          </div>

          <div className="flex flex-col mt-4">
            <label
              className="text-sm font-medium mb-1 dark:text-gray-300"
              htmlFor="searchAmenity"
            >
              Search Amenity
            </label>
            <input
              id="searchAmenity"
              type="text"
              placeholder="Search amenities"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 dark:text-gray-200"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium mb-1 dark:text-gray-300">
              Amenities
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-auto">
              {filteredAmenities.map((amenity) => (
                <label
                  key={amenity?._id}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={amenity?._id}
                    defaultChecked={selectedAmenities.some(
                      (a) => a?._id === amenity?._id
                    )}
                    onChange={handleAmenityChange}
                    className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-800 dark:border-gray-600"
                  />
                  <span className="text-sm font-medium dark:text-gray-300">
                    {amenity?.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex justify-${isEdit ? "center" : "between"} mt-6`}>
          {!isEdit && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={handleDiscard}
            >
              Discard
            </button>
          )}

          <button
            onClick={(e) => handleNext(e)}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white font-bold py-2 px-4 rounded-lg"
          >
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChooseProductType;
