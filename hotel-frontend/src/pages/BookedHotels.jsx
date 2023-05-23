import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { BookedDataUrl } from "../components/EnvironmentVariables";
import { MainUrl } from "../components/EnvironmentVariables";
import { BookedHotelCountContext } from "../components/Context";
import { useContext } from "react";
import "../components/dashboard.css";

const Index = () => {
  const [hotels, setHotel] = useState([]);
  const { fetchBookedHotel } = useContext(BookedHotelCountContext);
  useEffect(() => {
    // Fetch images from API or database

    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    try {
      const response = await fetch(`${BookedDataUrl}`);
      const data = await response.json();

      //  fetched hotels
      console.log(data);
      setHotel(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const onCancelHotel = async (id) => {
    try {
      //const statusData={status:"booked"}
      const confirmationMessage = window.confirm(
        "Are you sure, You Want To Cancel This Booking Hotel..."
      );
      if (confirmationMessage) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "available" }),
        };

        const response = await fetch(`${MainUrl}/${id}`, requestOptions);
        const data = await response.json();

        if (data.message === "ok") {
          fetchHotel();
          fetchBookedHotel();
        }
        //console.log(data)
      }
    } catch (error) {
      console.error("Error updating fetching hotels:", error);
    }
  };

  const getBookedHotelData = () => {
    return hotels.map((hotel) => {
      return (
        <div className="col-12 p-2" key={hotel._id}>
          <div className="card d-flex flex-lg-row  m-2 shadow">
            <div className="p-3">
              <img
                src={hotel.img_url}
                className=" booked-images rounded"
                alt={hotel.name}
              />
            </div>
            <div className="d-flex flex-column justify-content-center mx-3 mx-lg-5 ">
              <div className="d-flex flex-column ">
                <div>
                  <div className="d-flex flex-row align-items-center">
                    <h5 className="card-title name">{hotel.name}</h5>
                    <span className="ratingBg text-white p-2 ms-3 rounded-circle">
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
                    <p className="py-0 my-0 offer">
                      Price for day:{" "}
                      <b>
                        <span className="text-success">
                          {hotel.price.toFixed(2)}
                        </span>
                      </b>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mt-3 mb-0 pb-0">
                    <b>Features:</b>
                  </p>
                  <ul>
                    {hotel.features
                      ? hotel.features.map((feature) => {
                          return <li key={feature}>{feature}</li>;
                        })
                      : null}
                  </ul>
                </div>
              </div>
              <div className="d-flex  py-2">
                <button className="btn btn-secondary " disabled>
                  Booked
                </button>
                <button
                  className="btn btn-danger ms-3"
                  onClick={() => onCancelHotel(hotel._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div className="container ">
        <div className="row py-3 py-lg-5">
          <div className="col-12">
            <h3 className="Top-Hotels mb-0 pb-0">Booked Hotel List:</h3>
            <hr />
          </div>
          {hotels.length > 0 ? (
            <div className="row">{getBookedHotelData()}</div>
          ) : (
            <div className="text-center">
              <h2>No Booked Hotels</h2>
            </div>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
