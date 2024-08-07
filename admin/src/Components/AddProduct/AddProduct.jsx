import React, { useState } from "react";
import "./AddProduct.css";
import upload_product from "../../assets/ImageUpload.png";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "women",
    image: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("product", image);

      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      const responseData = await uploadResponse.json();

      if (uploadResponse.ok) {
        const updatedProduct = {
          ...productDetails,
          image: responseData.image_url,
        };

        const addProductResponse = await fetch(
          "http://localhost:4000/addproduct",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );
        const addProductData = await addProductResponse.json();
        console.log("addProductData", addProductData);
        if (addProductResponse.ok && addProductData.success) {
          alert("Product Added");
          // Reset form fields after successful addition if needed
          setProductDetails({
            name: "",
            old_price: "",
            new_price: "",
            category: "women",
            image: "",
          });
          setImage(null);
        } else {
          throw new Error("Failed to add product");
        }
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Enter product title"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Enter old price"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Enter offer price"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_product}
            className="addproduct-img"
            alt=""
            style={{ height: "150px" }}
          />
        </label>

        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={addProduct} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
