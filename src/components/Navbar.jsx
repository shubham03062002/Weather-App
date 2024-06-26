import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ background: "linear-gradient(45deg, #bbc5e3, transparent)" }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{
            marginLeft: "50px",
            display: "flex",
            alignItems: "end",
          }}
        >
          <img
            src="https://cdn.jim-nielsen.com/ios/1024/weather-2019-02-07.png"
            alt="weather-icon"
            style={{
              height: "50px",
              width: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
          />
          <h3 style={{ marginLeft: "15px" }}>Weather-App</h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-3">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#">
                Forecast
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
