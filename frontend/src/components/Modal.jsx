// Modal.js
import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 z-50 flex  justify-center dark:bg-gray-900 bg-opacity-50">
        <div className="my-10 bg-gray-500 dark:bg-gray-900 p-6 rounded-lg w-full max-w-7xl overflow-y-auto">
          <button
            onClick={onClose}
            className=" top-3 right-3 text-gray-100 hover:text-gray-200"
          >
            <FaTimes size={20} />
          </button>
          {children}
        </div>
      </div>
    );
};

export default Modal;
