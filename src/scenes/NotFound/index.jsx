import React from "react";
import Navbar from '../../components/LoginNavbar/index';
import './styles.css';

const MainPage = () => {
  return (
    <div>
      <Navbar/>
      <div id='center'>
          <h1>Page not found. Please double check the url.</h1>
      </div>
    </div>
  );
}

export default MainPage;