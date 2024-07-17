import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDraftCoworkingSpace,
  updateDraftCoworkingSpace,
  resetDraftCoworkingSpace,
} from '../../reducers/coworkingSpaceSlice'; // Adjust the import path as needed
import ChooseProductType from './stages/ChooseProductType'; // Import your stage components
// import Stage2 from './Stage2';
// import Stage3 from './Stage3';
// import Stage4 from './Stage4';
// import Stage5 from './Stage5';
// import Stage6 from './Stage6';
import ShowProducts from './ShowProducts';
import PhotosUpload from './stages/PhotosUpload';
import UpdateProduct from './UpdateProduct';
import { useParams } from 'react-router-dom';

const CreateProductComponent = () => {
  const { slug2 } = useParams();
  switch (slug2) {
    case "update":
      return <UpdateProduct />;
  }
  const dispatch = useDispatch();
  const draftCoworkingSpace = useSelector((state) => state.coworkingSpaces.draftCoworkingSpace);
  switch (draftCoworkingSpace?.stage) {
    case 1:
      return <ChooseProductType />;
    case 2:
      return <PhotosUpload />;
  }
      return (
        <div>

        <div className='flex justify-center items-center'>
          <button
            onClick={() => dispatch(createDraftCoworkingSpace())}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-800 dark:border dark:border-white'>
            Create Product
          </button>
        </div>
          <ShowProducts isAdmin={true} />
              </div>
      )
  }


export default CreateProductComponent;
