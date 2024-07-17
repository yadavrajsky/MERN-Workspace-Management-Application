import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../reducers/uploadSlice";

const FilterFilesModal = ({ handleCloseModal }) => {
  const { filter } = useSelector((state) => state.upload);
  const [filterInput, setFilterInput] = useState(filter || '');

const dispatch = useDispatch();
  return (
    <dialog
      id="filter_modal"
      className={`modal modal-open backdrop-blur px-4 transition-all`}
    >
      <div className="modal-box dark:bg-zinc-900  w-full lg:w-3/12 max-w-5xl">
        <h1 className="text-xl ml-2">Filter Options</h1>
        <div className="flex flex-wrap mt-4 justify-center">
          {/* File name */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text dark:text-white">File Name</span>
            </div>
            <input
              type="text"
              placeholder="Enter file name"
              className="input input-bordered w-full max-w-xs"
              name="project_no"
              onChange={(e) =>setFilterInput(e.target.value)}
              value={filterInput}
            />
          </label>
          
        </div>
        <div className="flex justify-center gap-2">
          <button
            className="btn border-none text-white text-lg mt-8 px-8 bg-[#525CEB] hover:bg-[#525CEB]/70"
            type="button"
            onClick={()=>{dispatch(updateFilter(filterInput));handleCloseModal()}}
          >
            Apply
          </button>
          <button
            className="btn border-none text-white text-lg mt-8 px-8 bg-[#ce0f09cc] hover:bg-[#525CEB]/70"
            type="button"
            onClick={() =>{dispatch(updateFilter(""));handleCloseModal()}}
          >
            Reset
          </button>
          <button
            className="btn text-lg mt-8 px-8 hover:text-black dark:hover:text-white text-white dark:text-zinc-800  bg-zinc-800 dark:bg-white"
            onClick={handleCloseModal}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default FilterFilesModal;
