import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Navbar from '../components/Navbar.jsx';
import LoginButton from '../components/LoginButton.jsx';
import Form from '../components/Form.jsx';
import CheckBox from '../components/Checkbox.jsx';
import jas_man from '../assets/jas.man.png';
import jas_woman from '../assets/jas.woman.png';
import jas_ground from '../assets/jas.ground.png';
import './AdminLogin.css';

class Login extends Component {
    state = {
      username: "",
      password: "",
      isClicked: false,
      forgotPassword: false,
      keepLoggedIn: false
    };


    constructor() {
        super();
    }

    render() {
        return (
          <div>
            <Navbar/>
            <div id="background-admin-login">
              <img className= "left-shift" src={jas_man} alt="icon" />
              <img className= "right-shift" src={jas_woman} alt="icon" />
              <img className= "bottom-admin-shift" src={jas_ground} alt="icon" />
              <div id="wrapper-admin-login">
                <div id="login-text-container">
                  <p id = "admin-login-text">Log In</p>
                </div>
                <div id="form-login">
                  <Form getUserInfo={this.retrieveUserInfo} forgotPassword={this.didForgetPassword}
                  isClicked={this.state.isClicked}/>
                </div>
                <div id="loginButton-login">
                  <LoginButton loginClick={this.handleClick} isClicked={this.state.isClicked}/>
                </div>
                <div id="checkbox-login">
                  <CheckBox checked={this.didCheckBox}/>
                </div>

              </div>
            </div>
          </div>
        );
    }


    componentDidUpdate = (prevProps, prevState) => {
      if (prevState.username != this.state.username) {
        this.printFields();
      }
      if (prevState.forgotPassword != this.state.forgotPassword) {
        console.log(this.state.forgotPassword);
      }
      if (prevState.keepLoggedIn != this.state.keepLoggedIn) {
        console.log(this.state.keepLoggedIn);
      }
    }

    didCheckBox = () => {
      this.setState((prevState, props) =>
        ({keepLoggedIn: (prevState.keepLoggedIn == true) ? false : true}));
    }

    didForgetPassword = () => {
      this.setState((prevState, props) =>
        ({forgotPassword: true}));
    }

    retrieveUserInfo = (u, p) => {
      this.setState({username: u, password: p});
    }

    handleClick = () => {
      console.log("Clicked");
      this.setState((prevState, props) =>
        ({isClicked: prevState.isClicked == false ? true : false}));
      setTimeout(10, this.printFields);
      this.printFields();
    }

    printFields = () => {
      console.log(this.state.username);
      console.log(this.state.password);
    }
}

export default Login;