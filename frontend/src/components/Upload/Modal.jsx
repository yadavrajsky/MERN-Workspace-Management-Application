import React from "react";
import classNames from "classnames";

const Modal = ({ isOpen, onClose,heading, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className={classNames(
        "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      )}
    >
      <h1>{heading}</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-3xl w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
