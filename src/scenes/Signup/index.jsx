import React, { Component } from 'react';
import Navbar from '../../components/LoginNavbar/index';
import SignUpForm from './components/SignupForm/index';
import jas_man from '../../assets/jas.man.png';
import jas_woman from '../../assets/jas.woman.png';
import jas_ground from '../../assets/jas.ground.png';
import './styles.css';

class SignUp extends Component {
    state = {
      username: "",
      password: "",
      isClicked: false,
    };

    render() {
      return (
        <div>
          <Navbar/>
          <div id="background-signup">
            <img id="left-shift" src={jas_man} alt="icon" />
            <div id="wrapper-login">
              <div id="signUpText">
              Sign Up
              </div>
              <div id="form-login">
                <SignUpForm isClicked={this.state.isClicked}/>
              </div>
              {/* <div id="loginButton-login">
                <SignUpButton signUpClick={this.handleClick} isClicked={this.state.isClicked}/>
              </div> */}
            </div>
            <img id="right-shift" src={jas_woman} alt="icon" />
          </div>
          <img id="bottom-shift" src={jas_ground} alt="icon" />
        </div>
      );
    }
}

export default SignUp;