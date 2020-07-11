import React, { Component } from 'react';
import Navbar from '../../components/LoginNavbar/index';
import LoginButton from './components/LoginButton/index';
import jas_man from '../../assets/jas.man.png';
import jas_woman from '../../assets/jas.woman.png';
import jas_ground from '../../assets/jas.ground.png';
import { withRouter } from 'react-router-dom';
import './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isClicked: false,
      isAdmin: false,
      forgotPassword: false,
      error:""
    };
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
    const { setAuthToken, setIsAdmin } = this.props;
    this.setState((prevState, props) =>
      ({isClicked: prevState.isClicked === false ? true : false}));

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    }

    fetch('http://localhost:8000/api/rest-auth/login/', fetchOptions)
      .then(res => res.ok ? res : Error)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setAuthToken(res['key']);
        const key = res['key']

        const fetchOptions2 = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Token ${key}`
          },
        }
  
        fetch(`http://127.0.0.1:8000/api/user/get_user_profile/?key=${key}`, fetchOptions2)
          .then(res => res.json())
          .then(res => {
            const status = res[0]['fields']['admin']
            if (status === true) {
              setIsAdmin(true)
              this.props.history.push("/admindashboard")
            } else {
              setIsAdmin(false)
              this.props.history.push('/userdashboard')
            }
          }).catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        this.setState({
          error: 
            "Looks like there's a problem logging in. Please check your credentials."});
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
    const { error } = this.state;
      return (
        <div>
          <Navbar/>
          <div id="background-login">
            <img id= "left-shift" src={jas_man} alt="icon" />
            <div id="wrapper-login">
              <div id="loginText">
              Login
              </div>

              <div>
                <form>
                  <div>
                    <input
                      className="loginInput"
                      ref={(el) => this._un = el}
                      type="text"
                      value={this.state.username}
                      onChange={this.changeUsernameHandler}
                      placeholder="Username">
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
                      onClick={() => this.didForgetPassword()}>
                    Forgot Password? </span>
                  </div>
                </form>
                {error !== '' && (<p>{error}</p>)}
              </div>
              <div id="loginButton-login">
                <LoginButton
                  loginClick={this.handleClick}
                  isClicked={this.state.isClicked}/>
              </div>
            </div>

            <img className= "right-shift" src={jas_woman} alt="icon" />
          </div>
          <img className= "bottom-shift" src={jas_ground} alt="icon" />
        </div>
      );
  }
}

export default withRouter(Login);