import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className = "container_navbar">
        	<img className= "logo-size" src={logo} alt="logo" />
        	<div className = "top-right">
	            <Link to="/admin-login" id ="login-link" className = "space-between-headers">Admin</Link>
	            <Link to="/" id ="login-link-current"  className = "space-between-headers">Alumni</Link>
              <h3 className = "space-between-headers">|</h3>
              <h3 className = "space-between-headers">Help</h3>
            </div>
        </div>
    );
}

export default Navbar