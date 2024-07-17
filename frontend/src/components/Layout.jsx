import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/NavbarNew";

const Layout = ({ children }) => {
    const [open, setOpen] = useState(true);
  return (
    <>
      <div className="flex flex-auto ">
        <Sidebar open={open} setOpen={setOpen} />
        <div className={`${
          open ? "ms-60" : "ms-24"
        } grow `}>
          <div className=" dark:bg-gray-800 w-full h-full mt-5">
            {children}
          </div>

          {/* <div className='m-5'>{children}</div> */}
        </div>
      </div>
    </>
  );
  
};

export default Layout;
