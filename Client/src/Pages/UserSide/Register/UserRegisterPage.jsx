import UserRegistrationComponent from "../../../Components/UserRegistration/UserRegistrationComponent.jsx";
import RegistrationCoverImage from "../../../assets/Images/Registration_Cover_Image.jpg";
import "./UserRegisterPage.css";

const UserRegisterPage = () => {
  return (
    <div className="container">
      <div className="register-container">
        <div className="register-card">
          <div className="left-side">
            <img
              src={RegistrationCoverImage}
              alt="Left"
              className="left-image"
            />
          </div>
          <div className="right-side">
            <h2 className="register-heading">Register Now</h2>
            <UserRegistrationComponent />
            <p>
              Note: You can login directly from Login Page with provided Demo
              Accounts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
