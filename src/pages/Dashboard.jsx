import React from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/login");
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
