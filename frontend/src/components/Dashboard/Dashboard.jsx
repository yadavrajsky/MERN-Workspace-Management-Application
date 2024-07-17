import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Home from "../Home";
import AddAmenities from "../admin/AddAmenities";
import AddBrand from "../admin/AddBrand";
import AddCity from "../admin/AddCity";
import AddEquipment from "../admin/AddEquipment";
import AddProduct from "../admin/AddProduct";
import AddProductType from "../admin/AddProductType";
const Dashboard = () => {
  const { slug } = useParams();
  let ActiveComponents;
  switch (slug) {
    case "amenities":
      ActiveComponents = AddAmenities;
      break;
    case "brands":
      ActiveComponents = AddBrand;
      break;
    case "cities":
      ActiveComponents = AddCity;
      break;
    case "equipments":
      ActiveComponents = AddEquipment;
      break;
    case "product-types":
      ActiveComponents = AddProductType;
      break;
    case "products":
      ActiveComponents = AddProduct;
      break;
    default:
      ActiveComponents = Home;
      break;
  }

  return (
    <>
      <ActiveComponents />
    </>
  );
};

export default Dashboard;
