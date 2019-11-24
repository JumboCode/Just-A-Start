import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoginButton from './loginButton.jsx';
import Form from './form.jsx';
import CheckBox from './checkbox.jsx';
import './login.css';

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
          <div id="background-login">
            <div id="wrapper-login">
              <div id="loginText">
                Log in
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
