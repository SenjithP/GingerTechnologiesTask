import PropTypes from "prop-types";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => paginate(currentPage - 1)}>
          <GrLinkPrevious />
        </button>
      )}
      {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, index) => (
        <button key={index} onClick={() => paginate(index + 1)}>
          {index + 1}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => paginate(currentPage + 1)}>
          <GrLinkNext />
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
