import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, Suspense } from "react";
// import Layout from "./pages/Layout";
// import Dashboard from "./components/Dashboard";
// import Home from "./pages/Home";
// import CreateHotel from "./pages/CreateHotel";
// import NoPage from "./pages/NotFound";
// import HotelPage from "./components/HotelPage";
// import BookedHotels from "./pages/BookedHotels";
import NoPage from "./pages/NotFound";
import { BookedHotelCountContext } from "./components/Context";
import { BookedDataUrl } from "./components/EnvironmentVariables";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

const Layout = React.lazy(() => import("./pages/Layout"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Home = React.lazy(() => import("./pages/Home"));
const CreateHotel = React.lazy(() => import("./pages/CreateHotel"));
const HotelPage = React.lazy(() => import("./components/HotelPage"));
const BookedHotels = React.lazy(() => import("./pages/BookedHotels"));

function App() {
  const [bookedHotels, setBookedHotels] = useState(0);

  useEffect(() => {
    fetchBookedHotel();
  }, []);

  const fetchBookedHotel = async () => {
    try {
      const response = await fetch(`${BookedDataUrl}`);
      const data = await response.json();

      setBookedHotels(data.length);
      //setSearchData(data);
    } catch (error) {
      console.error("Error fetching Booked Hotel:", error);
    }
  };
  return (
    <>
      <BookedHotelCountContext.Provider
        value={{ bookedHotels, fetchBookedHotel }}
      >
        <Suspense
          fallback={
            <div className="waiting-container">
              <b>Please Wait...</b>
            </div>
          }
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="hotels" element={<Dashboard />} />
                <Route path="hotels/:id" element={<HotelPage />} />
                <Route path="createhotel" element={<CreateHotel />} />
                <Route path="bookedhotel" element={<BookedHotels />} />

                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </BookedHotelCountContext.Provider>
    </>
  );
}

export default App;
