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
  createBrand,
  resetNotificationState,
  setSelectedBrand,
  updateBrand,
  deleteBrand,
  fetchBrands,
} from "../../reducers/brandSlice";
import { notifyError, notifyMessage } from "../../utils/notify";
import Loader from "../Loader/Loader";

const AddBrand = () => {
  const dispatch = useDispatch();
  const { brands, selectedBrand, loading, error, message } = useSelector(
    (state) => state.brand
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Fetch brands on component mount
    dispatch(fetchBrands());
  }, [dispatch]);

  const openModal = (brand) => {
    dispatch(setSelectedBrand(brand));
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(setSelectedBrand(null));
    dispatch(resetNotificationState());
  };

  const handleSubmit = (formData) => {
    if (isEdit) {
      dispatch(updateBrand({ id: selectedBrand._id, brandData: formData }));
    } else {
      dispatch(createBrand(formData));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteBrand(id));
  };

  useEffect(() => {
    if (error) {
      notifyError("Error", error);
      dispatch(resetNotificationState());
    }
    if (message) {
      notifyMessage("Success", message);
      dispatch(resetNotificationState());
      dispatch(fetchBrands());
    }
  }, [error, message, dispatch]);

  return (
    <div className="text-white w-full overflow-auto">
      <DynamicForm
        formData={{ title: "Add Brand", data: { name: "" } }}
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
            { icon: <FaTag className="text-gray-400" />, label: "Brand" },
            { icon: <FaTools className="text-gray-400" />, label: "Action" },
          ]}
        >
          {loading ? (
            <td colSpan={3} className="text-center py-4">
              <Loader />
            </td>
          ) : (
            <>
              {brands?.map((brand, index) => (
                <tr key={brand._id} className="dark:bg-gray-800 hover:dark:bg-gray-700 hover:text-gray-600">
                  <td className="py-3 text-center">{index + 1}</td>
                  <td className="py-3 text-center">{brand.name}</td>
                  <td className="flex justify-center items-center my-3 gap-3 text-center">
                    <button
                      title="Edit"
                      className="btn btn-primary flex items-center gap-2 p-1 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                      onClick={() => openModal(brand)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="btn btn-danger flex items-center gap-2 p-1 rounded ml-2 bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                      onClick={() => handleDelete(brand._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {brands?.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    <p className="text-gray-400">No brands found</p>
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
            title: isEdit ? "Update Brand" : "Add Brand",
            data: selectedBrand || { name: "" },
          }}
          isEdit={isEdit}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default AddBrand;
