/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";

export const notifyMessage = (customId, message) => {
  toast.success(message, {
    toastId: customId,
  });
};
export const notifyError = (customId, error) => {
  let errorMessage;

  if (typeof error === 'string') {
    errorMessage = error;
  } else if (Array.isArray(error)) {
    // Assuming the array contains strings, joining them for a better display
    errorMessage = error.join(' ');
  } else {
    // Fallback for unknown error formats
    errorMessage = 'An unexpected error occurred.';
  }

  toast.error(errorMessage, {
    toastId: customId,
  });
};
