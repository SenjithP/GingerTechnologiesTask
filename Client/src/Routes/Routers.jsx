import { Routes, Route } from "react-router-dom";
import NoPageFound from "../Pages/NoPage/NoPageFound.jsx";
import UserRegisterPage from "../Pages/UserSide/Register/UserRegisterPage.jsx";
import UserHomePage from "../Pages/UserSide/Home/UserHomePage.jsx";
import LoginPage from "../Pages/Login/LoginPage.jsx";
import AdminHomePage from "../Pages/AdminSide/AdminHomePage.jsx";
import UserPrivateRoute from "../Components/UserPrivateRoute.jsx";
import AdminPrivateRoute from "../Components/AdminPrivateRoute.jsx";

const Routers = () => {
  return (
    <Routes>
      {/* No Page Found */}
      <Route path="*" element={<NoPageFound />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* User Side */}
      <Route path="/userRegistration" element={<UserRegisterPage />} />
      <Route
        path="/userHome"
        element={
          <UserPrivateRoute>
            <UserHomePage />
          </UserPrivateRoute>
        }
      />

      {/* Admin Side */}
      <Route
        path="/adminHome"
        element={
          <AdminPrivateRoute>
            <AdminHomePage />
          </AdminPrivateRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
