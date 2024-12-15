// EditProduct.js
import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
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

  useEffect(() => {
    if (location.state && location.state.product) {
      setFormData(location.state.product);
    }
  }, [location.state]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.patch(
        "http://localhost:3000/edit-product/",
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
