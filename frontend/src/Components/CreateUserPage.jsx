import axios from "axios";
import Userform from "./UserForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreationUserPage() {
  // States
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate();

  // Handlers
  const handleCreateUser = async () => {
    try {
      axios
        .post("http://localhost:3000/create-user", formData)
        .then((response) => setPostResponse(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleCreateUser();
    setFormData({
      username: "",
      password: "",
    });
  };

  //Renderer
  return (
    <div>
      <Userform
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formData={formData}
        postResponse={postResponse}
        btnText="Create User"
      />
      {/* Add a navigate page to the login page */}
      <Link to="/">Back to login page</Link>
    </div>
  );
}
