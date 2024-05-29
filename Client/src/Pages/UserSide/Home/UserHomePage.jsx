import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useUserLogoutMutation } from "../../../Slices/userAuthenticationApiSlice.js";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../Slices/authenticationSlice.js";
import GingerLogoImage from "../../../assets/Images/ginger-logo.png";
import "./UserHomePage.css";
const UserHomePage = () => {
  const { userInfo } = useSelector((state) => state.authentication);
  const [userLogoutApiCall] = useUserLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      if (userInfo) {
        await userLogoutApiCall().unwrap();
        dispatch(userLogout());
        toast.success("Logout Successful");
        navigate("/userLogin");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <section className="container">
        <div className="profile-card">
          <img className="profile-image" src={GingerLogoImage} alt="Profile" />

          <h1 className="user-title">Hi, {userInfo.userName}</h1>
          <h1 className="user-title">Welcome to Ginger Technologies</h1>
          <p>
            Ginger Consultancy Services, also known and widely recognized as
            Ginger Technologies, started its operations in 2015 and has grown to
            become a renowned multinational company, with its headquarters in
            India. Ginger Technologies today operates in more than four
            locations and caters to clients all over the globe. Our primary
            objective is to establish enduring and fruitful partnerships with
            clients based on trust, genuine interest, and a comprehensive
            understanding of their business needs.
          </p>
          <button onClick={logoutHandler} className="logout-button">
            Log Out
          </button>
        </div>
      </section>
    </>
  );
};

export default UserHomePage;
