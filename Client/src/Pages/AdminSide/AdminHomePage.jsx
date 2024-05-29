import React, { useEffect, useState } from "react";

import "./AdminHomePage.css";
import Sidebar from "../../Components/AdminSide/Sidebar/Sidebar.jsx";
import Header from "../../Components/AdminSide/Header/Header.jsx";
import MainContent from "../../Components/AdminSide/MainContent/MainContent.jsx";
import Footer from "../../Components/AdminSide/Footer/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAdminLogoutMutation } from "../../Slices/adminAuthenticationApiSlice.js";
import { useGetUserDetailsMutation } from "../../Slices/adminApiSlice.js";
import { adminLogout } from "../../Slices/authenticationSlice.js";
import { toast } from "react-toastify";

const AdminHomePage = () => {
  const { adminInfo } = useSelector((state) => state.authentication);
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getUserDetails] = useGetUserDetailsMutation();
  const [adminLogoutApiCall] = useAdminLogoutMutation();

  const logoutHandler = async () => {
    try {
      if (adminInfo) {
        await adminLogoutApiCall().unwrap();
        dispatch(adminLogout());
        toast.success("Logout Successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const userDetail = await getUserDetails().unwrap();
      if (userDetail.userDetails) {
        setUsers(userDetail.userDetails);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getUserDetails]);

  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const toggleSearchBox = () => setIsSearchBoxVisible(!isSearchBoxVisible);

  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user?.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true);
      else setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="home">
      <Sidebar
        isOpen={isOpen}
        logoutHandler={() => logoutHandler()}
        toggleSidebar={toggleSidebar}
      />

      <div className="main">
        <div className="right-side-content">
          <Header
            isSearchBoxVisible={isSearchBoxVisible}
            toggleSearchBox={toggleSearchBox}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            adminInfo={adminInfo}
          />
          <MainContent
            currentItems={currentItems}
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
