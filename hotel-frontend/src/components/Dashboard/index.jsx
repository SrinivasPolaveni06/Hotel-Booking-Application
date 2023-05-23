import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../Footer";
import { MainUrl } from "../EnvironmentVariables";
import { BookedHotelCountContext } from "../Context";
import { useContext } from "react";
import "./dash-board.css";
const Index = () => {
  const [hotels, setHotels] = useState([]);
  //const [searchData, setSearchData] = useState([]);
  const [text, setText] = useState("");
  const { fetchBookedHotel } = useContext(BookedHotelCountContext);

  useEffect(() => {
    fetchHotel();
  }, [text]);

  const fetchHotel = async () => {
    try {
      const response = await fetch(`${MainUrl}?search=${text}`);
      const data = await response.json();

      setHotels(data);
      //setSearchData(data);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  const onChangeSearchText = (event) => {
    const searchedText = event.target.value;
    // const filteredData = searchData.filter((eachData) => {
    //   if (
    //     eachData.name.toLowerCase().includes(searchedText.toLowerCase()) ||
    //     eachData.location.toLowerCase().includes(searchedText.toLowerCase())
    //   ) {
    //     return eachData;
    //   }
    // });
    //setHotels(filteredData);
    console.log(searchedText);
    setText(searchedText);
  };

  const onBookedHotel = async (id) => {
    //console.log(confirmationMessage);
    try {
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
      }
    } catch (error) {
      console.error("Error updating fetching hotels:", error);
    }
  };

  const getHotelData = () => {
    return hotels.map((eachHotel) => {
      return (
        <>
          <div className="col-12 col-md-6 col-lg-4 py-3" key={eachHotel._id}>
            <div className="card hotel-card p-2  m-2 shadow">
              <div className="d-flex justify-content-center p-2">
                <img
                  src={eachHotel.img_url}
                  className="hotel-img rounded"
                  alt={eachHotel.name}
                />
              </div>

              <div className="card-body ms-4">
                <h5 className=" name">{eachHotel.name}</h5>
                <p className="location">{eachHotel.location}</p>
                <p className="card-text pt-0 mt-0">
                  {eachHotel.description.slice(0, 60)} ...Read more.
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="py-0 my-0">
                      Price for day:
                      <br /> <b>{eachHotel.price.toFixed(2)}</b>
                    </p>
                  </div>
                  <div>
                    <p className="py-1 my-1 offer">
                      Rating:{" "}
                      <span className="rating ratingBg rounded-circle">
                        {eachHotel.rating ? eachHotel.rating.toFixed(1) : null}
                      </span>
                    </p>
                    <p className="py-0 my-0 offer">
                      Offer: <span className="offer2">{eachHotel.offer} %</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center p-2 px-2 px-lg-3">
                {eachHotel.status === "booked" ? (
                  <button
                    className="btn btn-secondary bookBtn ms-lg-2"
                    disabled
                  >
                    Booked
                  </button>
                ) : (
                  <button
                    className="btn btn-success bookBtn ms-lg-2"
                    onClick={() => onBookedHotel(eachHotel._id)}
                  >
                    Book
                  </button>
                )}

                <NavLink to={`/hotels/${eachHotel._id}`}>
                  <button className="showBtn py-2 ">Show More Feature</button>
                </NavLink>
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col-12 ">
            <div className="row  pt-5 py-3 d-flex flex-row justify-content-between align-items-center">
              <div className="col-5">
                <h1 className="Top-Hotels">Top Hotels List:</h1>
              </div>

              <div className="col-5 my-3">
                <input
                  type="search"
                  onChange={(event) => onChangeSearchText(event)}
                  className="form-control"
                  placeholder="Search By Name Or Location"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
              </div>
              <hr className="px-3" />
            </div>
          </div>
          {hotels.length > 0 ? (
            <div className="row">{getHotelData()}</div>
          ) : (
            <div className="text-center">
              <h2>No Data Founded</h2>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Index;
