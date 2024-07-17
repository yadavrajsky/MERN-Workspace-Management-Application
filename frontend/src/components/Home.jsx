/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "./Navbar/NavbarNew";
import QuickFilter from "./Filter/QuickFilter";
import ShowProducts from "./admin/ShowProducts";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar />
      <QuickFilter />
      <ShowProducts/>
    </>
  );
};

export default Home;
