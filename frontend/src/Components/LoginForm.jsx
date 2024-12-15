import axios from "axios";
import UserForm from "./UserForm";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function LoginForm() {
  // States
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate();

  // UseEffect

  useEffect(() => {
    const cookie = Cookies.get("jwt-authorization");
    if (cookie) {
      Cookies.remove("jwt-authorization");
    }
  }, []);

  // Handlers
  const handleCookie = (jwtToken) => {
    Cookies.set("jwt-authorization", jwtToken);
  };

  const handleLogin = async () => {
    await axios
      .post("http://localhost:3000/login", {
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        setPostResponse(response.data.message);
        if (response.data.message === "User authenticated") {
          handleCookie(response.data.token);
          navigate("/main");
        }
      });
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setFormData({
      username: "",
      password: "",
    });
  };
  return (
    <div>
      <h1>Groceries App</h1>
      <UserForm
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formData={formData}
        postResponse={postResponse}
        btnText="Login"
      />
      <p>
        Not a member yet? Click <a href="/create-user">here</a> to join
      </p>
    </div>
  );
}
