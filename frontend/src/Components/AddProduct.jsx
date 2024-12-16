import React, { useState } from "react";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  // Initialize navigation and state for form data and server response
  const navigate = useNavigate();
  const [postResponse, setPostResponse] = useState(""); // Server response
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  // Update form data on input change
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data to server and navigate to "/main" on success
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3000/add-product",
        formData
      );
      setPostResponse(result.data); // Store server response
      navigate("/main"); // Redirect on success
    } catch (error) {
      console.log(error.message); // Log any errors
    }
  };

  return (
    <div className="addproduct">
      <h2>Add New Product</h2>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        formData={formData}
        postResponse={postResponse}
        isEditing={false}
      />
    </div>
  );
}
