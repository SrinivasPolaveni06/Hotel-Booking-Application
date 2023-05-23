//import * as React from 'react';
import React from "react";
//import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

//import Drawer from "../components/Drawer";

const Layout = () => {
  return (
    <>
      <div className="layout-container">
        <Navbar />
        <div className="pt-5 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
