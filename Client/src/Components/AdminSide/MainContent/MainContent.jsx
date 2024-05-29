import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import "./MainContent.css";

const MainContent = ({ currentItems, currentPage, totalPages, paginate }) => {
  return (
    <main className="main-content">
      <div className="title">
        <h3>Dashboard</h3>
        <h6>Dashboard / List</h6>
      </div>
      <div className="cards">
        {currentItems.length ? (
          currentItems.map((user, index) => <Card key={index} user={user} />)
        ) : (
          <div className="noUser">
            <h1>No User Found</h1>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </main>
  );
};

MainContent.propTypes = {
  currentItems: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      userEmail: PropTypes.string.isRequired,
      userMobileNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default MainContent;
