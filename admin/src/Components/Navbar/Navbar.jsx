import React from "react";
import "./Navbar.css";
import logo from "../../../src/assets/logo.png";
import userProfile from "../../assets/userProfile.png";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img src={logo} alt="Navigation logo" className="nav-logo" />
      <img src={userProfile} alt="User profile" className="nav-profile" />
    </div>
  );
};

export default Navbar;
