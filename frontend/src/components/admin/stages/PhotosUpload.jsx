import React, { useEffect } from "react";
import FileUpload from "../../Upload/FileUploader";
import { useDispatch, useSelector } from "react-redux";
import {
  createCoworkingSpace,
  resetDraftCoworkingSpace,
  resetNotificationState,
} from "../../../reducers/coworkingSpaceSlice";
import { notifyError, notifyMessage } from "../../../utils/notify";

const PhotosUpload = () => {
  const dispatch = useDispatch();

  const {draftCoworkingSpace,error,message,loading} = useSelector(
    (state) => state.coworkingSpaces
  );

  const handleCreateProperty = () => {
    dispatch(createCoworkingSpace(draftCoworkingSpace));
  };

  useEffect(() => {
    if (error) {
      notifyError("Error", error);
      dispatch(resetNotificationState());
    }
    if (message) {
      notifyMessage("Success", message);
      dispatch(resetNotificationState());
      dispatch(resetDraftCoworkingSpace());
    }
  }, [error, message, dispatch]);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg  mx-5">
      <h1 className="text-2xl font-semibold mb-6 text-center">Upload Photos</h1>
      <FileUpload />

    </div>
  );
};

export default PhotosUpload;
