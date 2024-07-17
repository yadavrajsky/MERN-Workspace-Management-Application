import React from "react";
import SearchComponent from "../SearchComponent";

const Navbar = () => {
  const handleSearch = (e) => {
    const keyword = e.target.value;
    if (keyword.length < 1) {
      // return setShow(false);
    }
    setShow(true);
    // dispatch((keyword));
  };
  return (
    <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-800  ">
      <div className=" flex justify-between items-center mx-auto py-3">
        <div className="flex items-center mx-auto">
          <SearchComponent handleSearch={handleSearch} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
