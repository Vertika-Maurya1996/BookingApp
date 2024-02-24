import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Header from "../components/Header";

const DriverRoutes = () => {
  let uID = localStorage.getItem("userID");
  let uType = localStorage.getItem("userType");

  if (!uID && uType !=1) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default DriverRoutes;
