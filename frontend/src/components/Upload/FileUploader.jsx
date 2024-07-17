import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { RiDeleteBinLine, RiUpload2Line } from "react-icons/ri";
import {
  deleteFile,
  removeDeletedFileId,
  removeUploadedFileList,
  resetNotificationState,
  updateUploadedFileList,
  uploadFiles,
} from "../../reducers/fileUploadSlice";
import { notifyError, notifyMessage } from "../../utils/notify";
import {
  createCoworkingSpace,
  resetDraftCoworkingSpace,
  updateCoworkingSpace,
  updateDraftCoworkingSpace,
} from "../../reducers/coworkingSpaceSlice";
import Modal from "../Modal";

import { RiImageAddLine } from "react-icons/ri";
import { useParams } from "react-router-dom";

const ViewPhotosButton = ({ onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      onClick={() => onClick()}
    >
      <RiImageAddLine className="mr-2" />
      View Uploaded
    </button>
  );
};

const UploadButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
    >
      <RiUpload2Line className="mr-2" />
      Upload
    </button>
  );
};

const FileUpload = ({ isEdit, toggle, setToggle }) => {
  const { id } = useParams();
  const { selectedCoworkingSpace } = useSelector(
    (state) => state.coworkingSpaces
  );
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const {
    draftCoworkingSpace,
    resetNotificationState: draftResetNotificationState,
    error: draftError,
    message: draftMessage,
  } = useSelector((state) => state.coworkingSpaces);
  const { loading, error, message, uploadedFilesList } =
    useSelector((state) => state.files); // Adjust state path as necessary

  const [openModal, setOpenModal] = useState(false);
  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const handleFileSelect = (e) => {
    setFiles((prevFiles) => [...prevFiles, ...e.target.files]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      notifyError("Error", "Please select at least one file");
      return;
    }
    // Create FormData object
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    // Dispatch the uploadFiles thunk
    dispatch(uploadFiles(formData));
  };

  const handleDeleteFile = (id) => {
    dispatch(deleteFile(id));
  };

  const handleDiscard = () => {
    dispatch(resetDraftCoworkingSpace());
    dispatch(removeUploadedFileList());
  };

  const handlePropertySubmit = (e) => {
    e.preventDefault();
    if (draftCoworkingSpace.photos.length == 0) {
      notifyError("Error", "Please upload at least one photo");
      return;
    }
    const updatedDraftCoworkingSpace = {
      name: draftCoworkingSpace.propertyName,
      location: draftCoworkingSpace.location,
      productType: draftCoworkingSpace.productType,
      amenities: draftCoworkingSpace.amenities,
      photos: draftCoworkingSpace.photos.map((photo) => photo?._id),
      brand: draftCoworkingSpace.brand ? draftCoworkingSpace.brand : null,
      creditsPerDeskPerMonth: draftCoworkingSpace.creditsPerDeskPerMonth,
      supportsParking: draftCoworkingSpace.supportsParking,
      supportsMetroConnectivity: draftCoworkingSpace.supportsMetroConnectivity,
    };
    if (isEdit) {
      dispatch(updateCoworkingSpace({ id, updatedDraftCoworkingSpace }));
    }
    else
    {
      dispatch(createCoworkingSpace(updatedDraftCoworkingSpace));

    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (draftCoworkingSpace.photos.length == 0) {
      notifyError("Error", "Please upload at least one photo");
      return;
    }
    if (draftCoworkingSpace.stage > 1) {
      if (isEdit) {
        const updatedDraftCoworkingSpace = {
          name: draftCoworkingSpace.propertyName,
          location: draftCoworkingSpace.location,
          productType: draftCoworkingSpace.productType,
          amenities: draftCoworkingSpace.amenities,
          photos: draftCoworkingSpace.photos.map((photo) => photo?._id),
          brand: draftCoworkingSpace.brand ? draftCoworkingSpace.brand : null,
          creditsPerDeskPerMonth: draftCoworkingSpace.creditsPerDeskPerMonth,
          supportsParking: draftCoworkingSpace.supportsParking,
          supportsMetroConnectivity: draftCoworkingSpace.supportsMetroConnectivity,
        };
        dispatch(updateCoworkingSpace({ id, updatedDraftCoworkingSpace }));
      }

      dispatch(
        updateDraftCoworkingSpace({
          ...draftCoworkingSpace,
          stage: draftCoworkingSpace.stage - 1,
        })
      );
    }
  };



  useEffect(() => {
    if (error) {
      notifyError("Error", error);
      dispatch(resetNotificationState());
    }
    if (message) {
      notifyMessage("Success", message);
      dispatch(resetNotificationState());
      setFiles([]);
    }
  }, [error, message]);

  useEffect(() => {
    if (draftError) {
      notifyError("Draft Error", error);
      dispatch(draftResetNotificationState());
    }
    if (draftMessage) {
      notifyMessage("Draft Success", message);
      if(!isEdit){
        dispatch(resetDraftCoworkingSpace());
      }
      dispatch(draftResetNotificationState());
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    if (error) {
      notifyError("Error", error);
      dispatch(resetNotificationState());
    }
    if (message) {
      notifyMessage("Success", message);
      dispatch(resetNotificationState());
    }
  }, [error, message, dispatch]);
  return (
    <div className="p-4">
      {/* <form> */}
      <div className="flex items-center space-x-4">
        <div
          {...getRootProps()}
          className={classNames(
            "border-2 border-dashed p-4 rounded-lg cursor-pointer flex-1",
            "bg-gray-100 dark:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            "hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          <input {...getInputProps()} onChange={handleFileSelect} />
          <p>Drag & drop some files here, or click to select files</p>
        </div>
        <UploadButton onClick={handleFileUpload} />
        {draftCoworkingSpace?.photos?.length > 0 && (
          <ViewPhotosButton onClick={() => setOpenModal(true)} />
        )}
      </div>
      {loading && <p>Uploading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {message && <p className="text-green-500">Success: {message}</p>}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative border rounded-lg overflow-hidden"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => handleRemoveFile(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4 text-white ">
            Uploaded Photos
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {draftCoworkingSpace?.photos?.map((file, index) => (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden"
              >
                <img
                  src={`${file?.url}`}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleDeleteFile(file?._id)}
                >
                  <RiDeleteBinLine className="absolute top-2 right-2  bg-red-500 text-white rounded-full p-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <div
        className={`flex justify-${isEdit ? "center" : "between"} gap-2 mt-24`}
      >
        {!isEdit && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={handleDiscard}
          >
            Discard
          </button>
        )}
        <button
          onClick={(e) => handlePrev(e)}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white font-bold py-2 px-4 rounded-lg"
        >
         {isEdit?"Update":"Save"} & Go back
        </button>
        <button
          onClick={(e) => handlePropertySubmit(e)}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white font-bold py-2 px-4 rounded-lg"
        >
         {isEdit?"Update":"Submit"} Property
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};

export default FileUpload;
