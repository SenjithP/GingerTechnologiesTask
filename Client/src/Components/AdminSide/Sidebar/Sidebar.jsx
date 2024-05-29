import PropTypes from "prop-types";
import { IoMdHome, IoIosSettings, IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { TiMessageTyping } from "react-icons/ti";
import { HiSquares2X2 } from "react-icons/hi2";
import { CgInsights } from "react-icons/cg";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { PiUserCirclePlusFill } from "react-icons/pi";
import { IoReorderThree } from "react-icons/io5";
import GingerLogoImage from "../../../assets/Images/logo_white.png";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, logoutHandler }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        <IoReorderThree />
      </button>
      <img src={GingerLogoImage} alt="Sidebar" className="sidebar-image" />
      <div className="sidebar-items">
        <div className="sidebar-item">
          <div className="sidebar-item-heading">
            <h6>MAIN</h6>
          </div>
          <div className="selected">
            <IoMdHome />
            <p>Dashboard</p>
          </div>
        </div>
        <div className="sidebar-item">
          <div className="sidebar-item-heading">
            <h6>MANAGE</h6>
          </div>
          <div className="notSelected">
            <div className="icons">
              <TiMessageTyping />
              <p>Inbox</p>
            </div>
            <div className="icons">
              <HiSquares2X2 />
              <p>Channels</p>
            </div>
            <div className="icons">
              <FaUser />
              <p>Business Profile</p>
            </div>
            <div className="icons">
              <CgInsights />
              <p>Insights</p>
            </div>
          </div>
        </div>
        <div className="sidebar-item">
          <div className="sidebar-item-heading">
            <h6>SETTINGS</h6>
          </div>
          <div className="notSelected">
            <div className="icons">
              <HiOutlinePlusCircle />
              <p>Create Roles</p>
            </div>
            <div className="icons">
              <PiUserCirclePlusFill />
              <p>Create Users</p>
            </div>
            <div className="icons">
              <IoIosSettings />
              <p>Settings</p>
            </div>
          </div>
        </div>
        <div className="sidebar-item">
          <div className="notSelected">
            <div className="icons">
              <FaUser />
              <p>Profile</p>
            </div>
            <div onClick={logoutHandler} className="icons">
              <IoMdLogOut />
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logoutHandler: PropTypes.func.isRequired,
};

export default Sidebar;
