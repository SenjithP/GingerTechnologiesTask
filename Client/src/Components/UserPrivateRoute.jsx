import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function UserPrivateRoute({ children }) {
  const { userInfo } = useSelector((state) => state.authentication);
  console.log(userInfo, "this is user info test");
  return userInfo ? <>{children}</> : <Navigate to="/" />;
}
UserPrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserPrivateRoute;
