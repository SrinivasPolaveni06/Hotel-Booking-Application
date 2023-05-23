import React, { useState, useEffect } from "react";
//import Navbar from "../Navbar";
import { useParams, NavLink } from "react-router-dom";
import { MainUrl } from "../EnvironmentVariables";
import { BookedHotelCountContext } from "../Context";
import { useContext } from "react";
import Footer from "../Footer";
import "../dashboard.css";
import "../Dashboard/dash-board.css";

const Index = () => {
  const [hotel, setHotel] = useState({});
  const params = useParams();
  const { id } = params;
  const { fetchBookedHotel } = useContext(BookedHotelCountContext);
  //console.log(id);
  //console.log(hotel);

  useEffect(() => {
    if (id) {
      fetchHotel();
    }
  }, [id]);

  const fetchHotel = async () => {
    try {
      // Make an API call to fetch the hotels
      const response = await fetch(`${MainUrl}/${id}`);
      const data = await response.json();

      // Update the state with the fetched hotels
      console.log(data);
      setHotel(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const onBookedHotel = async () => {
    try {
      // Make an API call to fetch the hotels
      //const statusData={status:"booked"}
      const confirmationMessage = window.confirm(
        "Are you sure, You want to book this hotel..."
      );
      if (confirmationMessage) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "booked" }),
        };

        const response = await fetch(`${MainUrl}/${id}`, requestOptions);
        const data = await response.json();

        // Update the state with the fetched hotels
        if (data.message === "ok") {
          fetchHotel();
          fetchBookedHotel();
        }
        //console.log(data)
        //setHotel(data);
      }
    } catch (error) {
      console.error("Error updating fetching hotels:", error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row pt-5 pb-0 d-flex justify-content-center">
          <div className="col-12">
            <h1 className="Top-Hotels">Hotel Specific Features:</h1>
            <hr />
          </div>
          <div className=" col-11 pb-3 pb-lg-5 ">
            <div className="card d-flex flex-lg-row p-3  m-2 shadow-lg">
              <div className="p-1">
                <img
                  src={hotel.img_url}
                  height="100%"
                  width="60%"
                  className="card-img-top rounded"
                  alt={hotel.name}
                />
              </div>
              <div className="ms-4 py-2 d-flex flex-column justify-content-center">
                <div className=" d-flex flex-column ms-4">
                  <div>
                    <div className="d-flex flex-row align-items-center">
                      <h5 className="card-title name">{hotel.name}</h5>
                      <span className="ratingBg text-white p-1 ms-3 rounded-circle">
                        {hotel.rating ? hotel.rating.toFixed(1) : null}
                      </span>
                    </div>

                    <p className="location">{hotel.location}</p>
                    <p className="card-text pt-0 mt-0">{hotel.description}</p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div>
                      <div>
                        <p className="py-2 my-0 offer">
                          Offer:
                          <span className="offer2"> {hotel.offer} %</span>
                        </p>
                      </div>
                      {hotel.price ? (
                        <p className="py-0 my-0 offer">
                          Price for day:
                          <b>
                            <span className="text-success">
                              {" "}
                              {hotel.price.toFixed(2)}
                            </span>{" "}
                          </b>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <p className="mt-3 mb-0 pb-0">
                      <b>Features:</b>
                    </p>
                    <ul>
                      {hotel.features ? (
                        hotel.features.map((feature) => {
                          return <li key={feature}>{feature}</li>;
                        })
                      ) : (
                        <p>No Features Area Available Now</p>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center ms-4 py-2">
                  {hotel.status === "booked" ? (
                    <button className="btn btn-secondary bookBtn" disabled>
                      Booked
                    </button>
                  ) : (
                    <button
                      className="btn btn-success bookBtn"
                      onClick={onBookedHotel}
                    >
                      Book
                    </button>
                  )}
                  <NavLink to="/hotels">
                    <button className="showBtn ms-5 py-2">Back to Home</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
