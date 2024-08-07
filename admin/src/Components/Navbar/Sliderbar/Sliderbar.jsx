import React from "react";
import "./Slider.css";
import { Link } from "react-router-dom";
import AddProducticon from "../../../assets/cart truck.png";
import ListProduct from "../../../assets/listproduct.png";

const Sliderbar = () => {
  return (
    <div className="Sliderbar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={AddProducticon} alt="" style={{ height: "100px" }} />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={ListProduct} alt="" style={{ height: "100px" }} />
          <p>List Product</p>
        </div>
      </Link>
    </div>
  );
};

export default Sliderbar;
