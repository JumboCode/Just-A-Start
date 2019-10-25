import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <div>
        	<img src={logo} alt="logo" />
        	<div>
	            <h3>Help</h3>
	            <h3>|</h3>
	            <Link to="/admin-login">Admin</Link>
	            <Link to="/alumni-login">Alumni</Link>
            </div>
        </div>
    );
}

export default Navbar;