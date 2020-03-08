import React, { Component } from 'react';
import Navbar from '../components/Navbar.jsx';
import LoginButton from '../components/LoginButton.jsx';
import CheckBox from '../components/Checkbox.jsx';
import jas_man from '../assets/jas.man.png';
import jas_woman from '../assets/jas.woman.png';
import jas_ground from '../assets/jas.ground.png';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    state = {
      username: "",
      password: "",
      isClicked: false,
      forgotPassword: false,
      keepLoggedIn: false,
    };

    didCheckBox = () => {
      this.setState((prevState, props) =>
        ({keepLoggedIn: (prevState.keepLoggedIn === true) ? false : true}));
    }

    didForgetPassword = () => {
      this.setState((prevState, props) =>
        ({forgotPassword: true}));
    }

    retrieveUserInfo = (u, p) => {
      this.setState({username: u, password: p});
    }

    handleClick = () => {
      const { username, password } = this.state;
      const { setAuthToken } = this.props;
      this.setState((prevState, props) =>
        ({isClicked: prevState.isClicked === false ? true : false}));

      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Token c8177c66ed167850799a05f5fc3959aaa884ca83`
        },
        body: JSON.stringify({username, password}),
      }
      fetch('http://localhost:8000/api/rest-auth/login/', fetchOptions)
        .then(res => res.json())
        .then(res => {
          setAuthToken(res['key']);
          this.props.history.push('/user-dashboard');
        })
        .catch(err => {
          console.error(err);
        })

    }

    setFields = () => {
      this.setState({username: this._un.value, password: this._ps.value});
    }

    changeUsernameHandler = (event) => {
      this.setState({username: event.target.value});
    }
    changePasswordHandler = (event) => {
      this.setState({password: event.target.value});

    }

    render() {
      const { isAuthenticated } = this.state;
        return (
          <div>
            <Navbar/>
            <div id="background-login">
              <img className= "left-shift" src={jas_man} alt="icon" />
              <img className= "right-shift" src={jas_woman} alt="icon" />
              <img className= "bottom-shift" src={jas_ground} alt="icon" />
              <div id="wrapper-login">
                <div id="loginText">
                Login
                </div>
                <div id="form-login">
                  <form>
                    <div>
                      <input
                        className="loginInput"
                        ref={(el) => this._un = el}
                        type="text"
                        value={this.state.username}
                        onChange={this.changeUsernameHandler}
                        placeholder="Username/Email address">
                      </input>
                    </div>

                    <div>
                      <input
                      className="loginInput" ref={(el) => this._ps = el}
                      type="password"
                      value={this.state.password}
                      onChange={this.changePasswordHandler}
                      placeholder="Password">
                      </input>
                    </div>
                    <div>
                      <span
                        id="forgotPass"
                        onClick={() => this.props.forgotPassword()}>
                      Forgot Password? </span>
                    </div>
                  </form>
                </div>
                <div id="loginButton-login">
                  <LoginButton
                    loginClick={this.handleClick}
                    isClicked={this.state.isClicked}/>
                </div>
                <div id="checkbox-login">
                  <CheckBox checked={this.didCheckBox}/>
                </div>

              </div>
            </div>
          </div>
        );
    }
}

export default withRouter(Login);