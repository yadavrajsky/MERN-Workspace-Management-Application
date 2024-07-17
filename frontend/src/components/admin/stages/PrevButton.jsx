import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDraftCoworkingSpace } from "../../../reducers/coworkingSpaceSlice";
import { useNavigate } from "react-router-dom";

const PrevButton = ({ updatedDraftCoworkingSpace }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draftCoworkingSpace = useSelector(
    (state) => state.coworkingSpaces.draftCoworkingSpace
  );


  return (
    <button
      onClick={handlePrev}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-bold py-2 px-4 rounded-lg"
    >
      Prev
    </button>
  );
};

export default PrevButton;
