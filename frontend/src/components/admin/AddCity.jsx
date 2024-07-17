import React, { useState, useEffect } from "react";
//useDispatch
import { useDispatch, useSelector } from "react-redux";
import {
  FaSortNumericDown,
  FaCity,
  FaFlag,
  FaTools,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import DynamicForm from "./DynamicForm";
import Table from "../Table";
import Modal from "../Modal";
import {
  createCity,
  resetNotificationState,
  updateCity,
  deleteCity,
  fetchCities,
} from "../../reducers/citySlice";
import { notifyError, notifyMessage } from "../../utils/notify";
import Loader from "../Loader/Loader";

const AddCity = () => {
  const dispatch = useDispatch();
  const { cities, selectedCity, loading, error, message } = useSelector(
    (state) => state.city
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Fetch cities on component mount
    dispatch(fetchCities());
  }, [dispatch]);

  const openModal = (city) => {
    dispatch(setSelectedCity(city));
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(setSelectedCity(null));
    dispatch(resetNotificationState());
  };

  const handleSubmit = (formData) => {
    if (isEdit) {
      dispatch(updateCity({ id: selectedCity._id, cityData: formData }));
    } else {
      dispatch(createCity(formData));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteCity(id));
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (error) {
      notifyError("Error", error);
      dispatch(resetNotificationState());
    }
    if (message) {
      notifyMessage("Success", message);
      dispatch(resetNotificationState());
      dispatch(fetchCities());
    }
  }, [error, message, dispatch]);

  return (
    <div className="text-white w-full overflow-auto">
      <DynamicForm
        formData={{ title: "Add City", data: { city: "", country: "" } }}
        isEdit={false}
        onSubmit={handleSubmit}
      />
      <div className="mx-5 my-5 overflow-y-auto">
        <Table
          columnHeadings={[
            {
              icon: <FaSortNumericDown className="text-gray-400" />,
              label: "Sr No.",
            },
            { icon: <FaCity className="text-gray-400" />, label: "City" },
            { icon: <FaFlag className="text-gray-400" />, label: "Country" },
            { icon: <FaTools className="text-gray-400" />, label: "Action" },
          ]}
        >
          {loading ? (
            <td colSpan={4} className="text-center py-4">
              {" "}
              <Loader />
            </td>
          ) : (
            <>
              {cities?.map((city, index) => (
                <tr key={city._id} className="dark:bg-gray-800 hover:dark:bg-gray-700 hover:text-gray-600">
                  <td className="py-3 text-center">{index + 1}</td>
                  <td className="py-3 text-center">{city.city}</td>
                  <td className="py-3 text-center">{city.country}</td>
                  <td className="flex justify-center items-center my-3  gap-3 text-center">
                    <button
                      title="Edit"
                      className="btn btn-primary flex items-center gap-2 p-1 rounded bg-blue-500 dark:text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                      onClick={() => openModal(city)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="btn btn-danger flex items-center gap-2 p-1 rounded ml-2 bg-red-500 dark:text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                      onClick={() => handleDelete(city._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {cities?.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <p className="text-gray-400">No cities found</p>
                  </td>
                </tr>
              )}
            </>
          )}
        </Table>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DynamicForm
          formData={{
            title: isEdit ? "Update City" : "Add City",
            data: selectedCity || { city: "", country: "" },
          }}
          isEdit={isEdit}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default AddCity;
