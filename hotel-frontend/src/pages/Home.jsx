import React from "react";
import { NavLink } from "react-router-dom";
import "../components/dashboard.css";
const index = () => {
  return (
    <div>
      <div className="dashboard-container d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="text-white fw-bold ">Spend Your Holiday</h1>
          <p className="text-light">Start and Book Your Favourite Hotels</p>
          <NavLink to="/hotels">
            <button className="btn btn-success">Get Start</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default index;
