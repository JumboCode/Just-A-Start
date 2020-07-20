import React from "react";
import logo from '../../assets/images/logo.png';
import './styles.css';

const Navbar = () => {
    return (
        <div className = "container_navbar">
			<a href="/">
        		<img className= "logo-size" src={logo} alt="logo" />
			</a>
        </div>
    );
}

export default Navbar