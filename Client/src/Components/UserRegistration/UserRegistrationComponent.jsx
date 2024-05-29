import { useState } from "react";
import { toast } from "react-toastify";
import "./UserRegistrationComponent.css";
import { useUserRegistrationMutation } from "../../Slices/userAuthenticationApiSlice";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

const UserRegistrationComponent = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userMobileNumber: "",
  });

  const [userRegistration, { isLoading }] = useUserRegistrationMutation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userRegistration(formData).unwrap();
      toast.success("Registration successful!");
      setFormData({
        userName: "",
        userEmail: "",
        userPassword: "",
        userMobileNumber: "",
      });
      navigate("/");
    } catch (error) {
      if (error.data && error.data.error) {
        toast.error(error.data.error);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="userPassword"
          value={formData.userPassword}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          placeholder="Mobile Number"
          name="userMobileNumber"
          value={formData.userMobileNumber}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? <RotatingLines /> : "Register"}
        </button>
      </form>
      <p className="loginRedirect">
        Already have an account?{" "}
        <Link className="text-blue-500 font-medium ml-1" to={"/"}>
          Login
        </Link>
      </p>
    </>
  );
};

export default UserRegistrationComponent;
