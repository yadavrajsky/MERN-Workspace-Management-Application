import React, { useEffect, useState } from "react";
import Dropdown from "./DropDown";
import { fetchProductTypes } from "../../reducers/productTypeSlice";
import { useDispatch, useSelector } from "react-redux";

const SpaceTypeFilter = () => {
  const dispatch = useDispatch();
  const { productTypes } = useSelector((state) => state.productType);
  const [selectedProduct, setSelectedProduct] = useState(
    productTypes[0]?._id || null
  );

  useEffect(() => {
    dispatch(fetchProductTypes());
  }, [dispatch]);

  return (
    <div className=" relative p-4 max-w-sm mx-auto h-fit">
      <Dropdown title="Product">
        <div className="product-item space-y-2">
            <div
              key={product?._id?.toString()}
              className="flex items p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <input
                type="radio"
                id={product?._id}
                name="productType"
                value={product?._id}
                checked={selectedProduct === product?._id}
                onChange={() => setSelectedProduct(product?._id)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={product?._id}
                className="ml-3 text-sm text-gray-900 dark:text-gray-300"
              >
                {product?.name}
              </label>
            </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default SpaceTypeFilter;
