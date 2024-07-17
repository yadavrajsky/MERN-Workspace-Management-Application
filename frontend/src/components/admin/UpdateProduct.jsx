import React, { useEffect, useState } from "react";
import UpdateProductType from "./stages/UpdateProductType";
import ChooseProductType from "./stages/ChooseProductType";
import FileUpload from "../Upload/FileUploader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoworkingSpaceById,
  resetNotificationState,
  updateDraftCoworkingSpace,
} from "../../reducers/coworkingSpaceSlice";
import { notifyError, notifyMessage } from "../../utils/notify";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCoworkingSpace, error, message } = useSelector(
    (state) => state.coworkingSpaces
  );
  const draftCoworkingSpace = useSelector(
    (state) => state.coworkingSpaces.draftCoworkingSpace
  );

  // Determine the active component based on the stage
  let ActiveComponent = null;
  switch (draftCoworkingSpace?.stage) {
    case 1:
      ActiveComponent = ChooseProductType;
      break;
    case 2:
      ActiveComponent = FileUpload;
      break;
    default:
      ActiveComponent = () => <div>Select a stage</div>; // Handle undefined stage
      break;
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchCoworkingSpaceById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedCoworkingSpace) {
      dispatch(
        updateDraftCoworkingSpace({ ...selectedCoworkingSpace, stage: 1 })
      );
    }
  }, [selectedCoworkingSpace, dispatch]);

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
    <div>
      {ActiveComponent && <ActiveComponent isEdit={true} />}
    </div>
  );
};

export default UpdateProduct;
