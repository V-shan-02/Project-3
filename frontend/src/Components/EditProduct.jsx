// EditProduct.js
import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
  // Initialize navigation, location, and states for form data and server response
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
    _id: "",
  });
  const [postResponse, setPostResponse] = useState("");

  // Populate form data if product is passed through location state
  useEffect(() => {
    if (location.state?.product) {
      setFormData(location.state.product);
    }
  }, [location.state]);

  // Update form data on input change
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated form data to server and navigate to "/main" on success
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.patch(
        "http://localhost:3000/edit-product/",
        formData
      );
      setPostResponse(result.data); // Store server response
      navigate("/main"); // Redirect on success
    } catch (error) {
      console.log(error.message); // Log errors
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={true}
      />
    </div>
  );
}
