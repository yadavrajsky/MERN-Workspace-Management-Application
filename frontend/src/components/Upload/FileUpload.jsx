import React, { useState } from "react";

import FileUploadModal from "./FileUploadModal";

const FileUpload = () => {
  const [fileUploadModalOpen, setFileUploadModalOpen] = useState(false);
  const handleFileUploadModal = () => {
    setFileUploadModalOpen(!fileUploadModalOpen);
  };
  return (
    <div>
      <div className="flex items-center justify-center pt-3">
        <button
          className="btn border-none text-white text-lg my-8 px-8 bg-[#525CEB] hover:bg-[#525CEB]/70"
          onClick={handleFileUploadModal}
        >
          Upload a file
        </button>
      </div>
      {fileUploadModalOpen && (
        <FileUploadModal handleCloseModal={handleFileUploadModal} />
        
      )}
    </div>
  );
};

export default FileUpload;
