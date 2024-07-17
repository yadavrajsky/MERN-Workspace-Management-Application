// FileUpload.js

import React, { useState } from "react";
// import { uploadFile } from "../../../reducers/uploadSlice";
import { useDispatch } from "react-redux";

const FileUpload = ({ handleCloseModal }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (selectedFile) => {
    // Validate file type (Excel)
    if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
      setFile(selectedFile);
    } else {
      // Reset file input if the selected file is not an Excel file
      setFile(null);
      console.error("Please choose a valid Excel file (.xlsx)");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("Please choose a valid Excel file (.xlsx)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    // dispatch(uploadFile(formData));
    handleCloseModal();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <dialog
      id="filter_modal"
      className={`modal modal-open backdrop-blur px-4 transition-all`}
    >
      <div className="modal-box dark:bg-zinc-900  w-full lg:w-3/12 max-w-5xl">
        <h1 className="text-xl ml-2"> Choose an Excel file (.xlsx):</h1>

        <div className="pt-3">
          {/* <div className="mx-auto max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> */}
          {/* <label className="block text-sm font-bold mb-2 text-gray-800 dark:text-white">
                    Choose an Excel file (.xlsx):
                </label> */}
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-md flex justify-center items-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <>
              <label
                htmlFor="file-input"
                className="cursor-pointer text-blue-500 dark:text-blue-400 hover:text-blue-700"
              >
                <span className="text-sm">
                  Click to browse or drag and drop here
                </span>
              </label>
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files[0])}
                accept=".xlsx"
              />
            </>

            {file && (
              <>
                <span className="ml-3 text-gray-800 dark:text-white overflow-auto">
                  {file.name}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              className="btn border-none text-white text-lg mt-8 px-8 bg-[#248d35] hover:bg-[#525CEB]/70"
              onClick={handleUpload}
              disabled={!file}
            >
              Upload
            </button>
            <button
              className="btn text-lg mt-8 px-8 hover:text-black dark:hover:text-white text-white dark:text-zinc-800  bg-zinc-800 dark:bg-white"
              onClick={handleCloseModal}
              type="button"
            >
              Close
            </button>
          </div>

          {/* </div> */}
        </div>
      </div>
    </dialog>
  );
};

export default FileUpload;
