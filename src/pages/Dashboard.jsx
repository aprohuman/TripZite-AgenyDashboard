import React from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Notification from "../components/Notifications";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    };

    return (
        <div>
            <Header/>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <Notification/>
            <Footer/>
        </div>
    );
};

export default Dashboard;
