import React from "react";
import logo from '../../assets/images/logo.png';
import './styles.css';

const Navbar = () => {
    return (
        <div className = "container_navbar">
        	<img className= "logo-size" src={logo} alt="logo" />
        	<div className = "top-right">
	            {/* <h3 className = "space-between-headers">Help</h3> */}
	            {/* <h3 className = "space-between-headers">|</h3> */}
	            {/* <Link to="/admin-login" className = "space-between-headers">Admin</Link>
	            <Link to="/" className = "space-between-headers">Alumni</Link> */}
            </div>
        </div>
    );
}

export default Navbar