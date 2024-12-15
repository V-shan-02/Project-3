// AddProduct.js
import React, { useState } from "react";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  const navigate = useNavigate();
  const [postResponse, setPostResponse] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3000/add-product",
        formData
      );
      setPostResponse(result.data);
      navigate("/main");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
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
