import React from "react";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import "./Card.css";

const Card = ({ user }) => {
  return (
    <div className="card">
      <div className="cardUserIcon">
        <FaUser />
      </div>
      <div>
        <h3>{user.userName}</h3>
        <p>
          <strong>Email: </strong>
          {user.userEmail}
        </p>
        <p>
          <strong>Mobile No: </strong>
          {user.userMobileNumber}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userMobileNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
