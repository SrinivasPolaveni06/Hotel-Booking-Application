import React from "react";
import { NavLink } from "react-router-dom";
import { BookedHotelCountContext } from "../Context";
import { useContext } from "react";
import "./index.css";
const Index = () => {
  const { bookedHotels } = useContext(BookedHotelCountContext);
  return (
    <div>
      <nav className=" bg-light navbar navbar-expand-lg  navBarContainer">
        <div className="container">
          <NavLink to="/">
            <b>Hotel Booking App</b>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto text-white mb-2 mb-lg-0">
              <NavLink to="/">
                <li className="nav-item">Home</li>
              </NavLink>

              <NavLink to="/hotels">
                <li className="nav-item">Dashboard</li>
              </NavLink>

              <NavLink to="/createhotel">
                <li className="nav-item">create Hotel</li>
              </NavLink>

              <NavLink to="/bookedhotel">
                <li className="nav-item">
                  Booked Hotels{" "}
                  <span className="badge text-bg-danger">{bookedHotels}</span>
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
