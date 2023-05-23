import React from "react";

const index = () => {
  return (
    <div className="mt-2 ">
      <footer className="text-center mb-0 text-lg-start bg-dark text-muted">
        <section className="d-flex justify-content-center text-white justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="#!" className="me-4 ">
              <i className="bi bi-facebook text-white"></i>
            </a>
            <a href="#!" className="me-4 link-secondary">
              <i className="bi bi-twitter text-white"></i>
            </a>
            <a href="#!" className="me-4 link-secondary">
              <i className="bi bi-google text-white"></i>
            </a>
            <a href="#!" className="me-4 link-secondary">
              <i className="bi bi-instagram text-white"></i>
            </a>
            <a href="#!" className="me-4 link-secondary">
              <i className="bi bi-linkedin text-white"></i>
            </a>
            <a href="#!" className="me-4 link-secondary">
              <i className="bi bi-github text-white"></i>
            </a>
          </div>
        </section>

        <section className="text-white">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Project name :</h6>
                <p className="fw-bold ms-3">Hotel Booking App</p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Locations</h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Hyderabad
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Karimnagar
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Bengular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Delhi
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Contact :</h6>
                <p>
                  <i className="bi bi-person-circle"></i> Srinivas Polaveni
                </p>
                <p>
                  <i className="bi bi-envelope-fill"></i> srinivas@gmail.com
                </p>
                <p>
                  <i className="bi bi-phone"></i> +91 9182969103
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center text-white p-1 pb-5 ">
          © 2023 Copyright : <b>Hotel Booking</b>
        </div>
      </footer>
    </div>
  );
};

export default index;
