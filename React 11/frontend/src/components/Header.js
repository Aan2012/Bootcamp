import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Header.css"

const Header = () => {
    const [activeTab, setActiveTab] = useState("Homes"); // Corrected initialization
    const location = useLocation();
    useEffect(() =>{
        if(location.pathname === "/") {
            setActiveTab("Homes");
        } else if(location.pathname === "/add"){
            setActiveTab("AddUser");
        } else if(location.pathname === "/about"){
            setActiveTab('About');
        }
    }, [location])
    return (
        <div className='header'>
            <p className='logo'>User Management System</p>
            <div className='header-right'>
                <Link to="/">
                    <p className={`${activeTab === "Homes" ? "active" : ""}`} onClick={() => setActiveTab("Homes")}>Homes</p>
                </Link>
                <Link to="/add">
                    <p className={`${activeTab === "AddUser" ? "active" : ""}`} onClick={() => setActiveTab("AddUser")}>Add User</p>
                </Link>
                <Link to="/about">
                    <p className={`${activeTab === "About" ? "active" : ""}`} onClick={() => setActiveTab("About")}>About</p>
                </Link>
            </div>
        </div>
    )
}

export default Header;
