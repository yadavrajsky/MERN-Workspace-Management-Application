import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDraftCoworkingSpace } from "../../../reducers/coworkingSpaceSlice";
import { useNavigate } from "react-router-dom";

const NextButton = ({ updatedDraftCoworkingSpace }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draftCoworkingSpace = useSelector(
    (state) => state.coworkingSpaces.draftCoworkingSpace
  );

  const handleNext = () => {
    if (draftCoworkingSpace.stage < 2) {
      dispatch(
        updateDraftCoworkingSpace({
          ...updatedDraftCoworkingSpace,
          stage: draftCoworkingSpace.stage + 1,
        })
      );
      navigate(draftCoworkingSpace.stage + 1);
    }
  };

  return (
    <button
      onClick={handleNext}
      className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white font-bold py-2 px-4 rounded-lg"
    >
      Next
    </button>
  );
};

export default NextButton;
