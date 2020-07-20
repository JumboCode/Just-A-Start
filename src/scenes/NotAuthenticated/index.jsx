import React from "react";
import Navbar from '../../components/LoginNavbar/index';
import './styles.css';

const MainPage = () => {
    return (
      <div>
        <Navbar/>
        <div id='center'>
            <h1>Please log in to continue.</h1>
        </div>
      </div>
    );
}

export default MainPage;