import LoginCoverImage from "../../assets/Images/Login_Cover_Image.jpg";
import LoginComponent from "../../Components/Login/LoginComponent";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="container">
      <div className="login-container">
        <div className="login-card">
          <div className="left-side">
            <img src={LoginCoverImage} alt="Left" className="left-image" />
          </div>
          <div className="right-side">
            <h2 className="login-heading">Login Now</h2>
            <LoginComponent />
            <p>
              <strong>Admin:-</strong> admin@gmail.com => Admin@123 <br />{" "}
              <strong>User:-</strong> user@gmail.com => User@123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
