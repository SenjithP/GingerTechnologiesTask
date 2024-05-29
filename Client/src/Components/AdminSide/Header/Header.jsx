import React from "react";
import PropTypes from "prop-types";
import { FaUser, FaRegBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CgCircleci } from "react-icons/cg";
import { RiMessage2Line } from "react-icons/ri";
import "./Header.css";

const Header = ({
  isSearchBoxVisible,
  toggleSearchBox,
  searchTerm,
  setSearchTerm,
  adminInfo,
}) => {
  return (
    <header className="header">
      <div className="logo">
        <div className="dp">
          <FaUser />
        </div>
        <div className="logo-content">
          <span className="logo-name">Welcome Back, </span>
          <span className="logo-email">{adminInfo?.email}</span>
        </div>
      </div>
      <div className="sideicons">
        <div className="sideicon-container">
          <CgCircleci />
        </div>
        <div className="sideicon-container" onClick={toggleSearchBox}>
          <CiSearch />
        </div>
        {isSearchBoxVisible && (
          <input
            type="text"
            className="search-box"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
        <div className="sideicon-container">
          <RiMessage2Line />
          <span className="badge">5</span>
        </div>
        <div className="sideicon-container">
          <FaRegBell />
          <span className="badge">3</span>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isSearchBoxVisible: PropTypes.bool.isRequired,
  toggleSearchBox: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  adminInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
