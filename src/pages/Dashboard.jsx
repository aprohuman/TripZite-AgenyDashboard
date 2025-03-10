import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Notification from "../components/Notifications";

const Dashboard = () => {

    return (
        <div>
            <Header/>
            <Notification/>
            <Footer/>
        </div>
    );
};

export default Dashboard;
