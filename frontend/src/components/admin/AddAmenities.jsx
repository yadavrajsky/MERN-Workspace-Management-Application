import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSortNumericDown,
  FaTag,
  FaTools,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import DynamicForm from "./DynamicForm";
import Table from "../Table";
import Modal from "../Modal";
import {
  createAmenity,
  resetNotificationState,
  setSelectedAmenity,
  updateAmenity,
  deleteAmenity,
  fetchAmenities,
} from "../../reducers/amentySlice";
import { notifyError, notifyMessage } from "../../utils/notify";
import Loader from "../Loader/Loader";

const AddAmenities = () => {
  const dispatch = useDispatch();
  const { amenities, selectedAmenity, loading, error, message } = useSelector(
    (state) => state.amenity
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchAmenities());
  }, [dispatch]);

  const openModal = (amenity) => {
    dispatch(setSelectedAmenity(amenity));
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(setSelectedAmenity(null));
    dispatch(resetNotificationState());
  };

  const handleSubmit = (formData) => {
    if (isEdit) {
      dispatch(
        updateAmenity({ id: selectedAmenity._id, amenityData: formData })
      );
    } else {
      dispatch(createAmenity(formData));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteAmenity(id));
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  useEffect(() => {
    if (error) {
      notifyError("Error", error);
      dispatch(resetNotificationState());
    }
    if (message) {
      notifyMessage("Success", message);
      dispatch(resetNotificationState());
      dispatch(fetchAmenities());
    }
  }, [error, message, dispatch]);

  return (
    <div className="text-white w-full overflow-auto">
      <DynamicForm
        formData={{ title: "Add Amenity", data: { name: "", description: "" } }}
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
            { icon: <FaTag className="text-gray-400" />, label: "Name" },
            { icon: <FaTag className="text-gray-400" />, label: "Description" },
            { icon: <FaTools className="text-gray-400" />, label: "Action" },
          ]}
        >
          {loading ? (
            <td colSpan={4} className="text-center py-4">
              <Loader />
            </td>
          ) : (
            <>
              {amenities?.map((amenity, index) => (
                <tr key={amenity._id} className="dark:bg-gray-800 hover:dark:bg-gray-700 hover:text-gray-600">
                  <td className="py-3 text-center">{index + 1}</td>
                  <td className="py-3 text-center">{amenity.name}</td>
                  <td className="py-3 text-center">{amenity.description}</td>
                  <td className="flex justify-center items-center my-3 gap-3 text-center">
                    <button
                      title="Edit"
                      className="btn btn-primary flex items-center gap-2 p-1 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                      onClick={() => openModal(amenity)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="btn btn-danger flex items-center gap-2 p-1 rounded ml-2 bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                      onClick={() => handleDelete(amenity._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {amenities?.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 ">
                    <p className="text-gray-400 text-center">
                      No Amenities found
                    </p>
                  </td>
                </tr>
              )}
            </>
          )}
        </Table>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal} title="Edit Amenity">
        <DynamicForm
          formData={{ title: "Edit Amenity", data: selectedAmenity }}
          isEdit={true}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default AddAmenities;
