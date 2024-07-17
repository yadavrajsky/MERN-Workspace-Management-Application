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
  createEquipment,
  resetNotificationState,
  setSelectedEquipment,
  updateEquipment,
  deleteEquipment,
  fetchEquipment,
} from "../../reducers/equipmentSlice";
import { notifyError, notifyMessage } from "../../utils/notify";
import Loader from "../Loader/Loader";

const AddEquipment = () => {
  const dispatch = useDispatch();
  const { equipment, selectedEquipment, loading, error, message } = useSelector(
    (state) => state.equipment
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchEquipment());
  }, [dispatch]);

  const openModal = (equipment) => {
    dispatch(setSelectedEquipment(equipment));
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(setSelectedEquipment(null));
    dispatch(resetNotificationState());
  };

  const handleSubmit = (formData) => {
    if (isEdit) {
      dispatch(
        updateEquipment({ id: selectedEquipment._id, equipmentData: formData })
      );
    } else {
      dispatch(createEquipment(formData));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteEquipment(id));
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  useEffect(() => {
    if (error) {
      notifyError("Error", error);
      dispatch(resetNotificationState());
    }
    if (message) {
      notifyMessage("Success", message);
      dispatch(resetNotificationState());
      dispatch(fetchEquipment());
    }
  }, [error, message, dispatch]);

  return (
    <div className="text-white w-full overflow-auto">
      <DynamicForm
        formData={{ title: "Add Equipment", data: { name: "" } }}
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
            { icon: <FaTools className="text-gray-400" />, label: "Action" },
          ]}
        >
          {loading ? (
            <td colSpan={3} className="text-center py-4">
              <Loader />
            </td>
          ) : (
            <>
              {equipment?.map((item, index) => (
                <tr key={item._id} className="dark:bg-gray-800 hover:dark:bg-gray-700 hover:text-gray-600">
                  <td className="py-3 text-center">{index + 1}</td>
                  <td className="py-3 text-center">{item.name}</td>
                  <td className="flex justify-center items-center my-3 gap-3 text-center">
                    <button
                      title="Edit"
                      className="btn btn-primary flex items-center gap-2 p-1 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                      onClick={() => openModal(item)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="btn btn-danger flex items-center gap-2 p-1 rounded ml-2 bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {equipment?.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    <p className="text-gray-400 text-center">
                      No Equipment found
                    </p>
                  </td>
                </tr>
              )}
            </>
          )}
        </Table>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title={isEdit ? "Edit Equipment" : "Add Equipment"}
      >
        <DynamicForm
          formData={{
            title: isEdit ? "Edit Equipment" : "Add Equipment",
            data: selectedEquipment,
          }}
          isEdit={isEdit}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default AddEquipment;
