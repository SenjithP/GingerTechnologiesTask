import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import "./LoginComponent.css";
import {
  setAdminCredentials,
  setUserCredentials,
} from "../../Slices/authenticationSlice";
import { useUserLoginMutation } from "../../Slices/userAuthenticationApiSlice";
import { useAdminLoginMutation } from "../../Slices/adminAuthenticationApiSlice";

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authentication);
  const { adminInfo } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (userInfo) {
      navigate("/userHome");
    }
    if (adminInfo) {
      navigate("/adminHome");
    }
  }, [navigate, userInfo]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [userLogin] = useUserLoginMutation();
  const [adminLogin] = useAdminLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { role, email, password } = formData;

    if (!email || !password || !role) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      if (role === "user") {
        const user = await userLogin({ email, password }).unwrap();
        dispatch(setUserCredentials(user));
        toast.success("Login successful!");
        navigate("/userHome");
      } else if (role === "admin") {
        const admin = await adminLogin({ email, password }).unwrap();
        dispatch(setAdminCredentials(admin));
        toast.success("Login successful!");
        navigate("/adminHome");
      }
    } catch (error) {
      if (error.data && error.data.error) {
        toast.error(error.data.error);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <div className="selectRole">
          <p>Your Role:</p>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleInputChange}
                required
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleInputChange}
                required
              />
              Admin
            </label>
          </div>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? <RotatingLines width="20" /> : "Login"}
        </button>
      </form>
      <p className="registerRedirect">
        Don't have an account?{" "}
        <Link
          className="text-blue-500 font-medium ml-1"
          to={"/userRegistration"}
        >
          Register
        </Link>
      </p>
    </>
  );
};

export default LoginComponent;
