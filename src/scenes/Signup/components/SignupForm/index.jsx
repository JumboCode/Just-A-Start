import React, { Component } from 'react';
import SignUpButton from '../../components/SignupButton/index';
import { config } from '../../../../Constants'
import { withRouter } from 'react-router-dom';
import './styles.css';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      url: `${config.url.API_URL}/api/registration/`,
      status: "",
      accountMade: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.isClicked !== this.props.isClicked) {
      this.sendRegisterRequest(this.state.username, this.state.password1, this.state.password2, this.state.email);
    }
  }

  handleClick = () => {
    let user = {
      'username': this.state.username,
      'first_name': this.state.first_name,
      'last_name': this.state.last_name,
      'email': this.state.email,
      'password': this.state.password,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }

    fetch(this.state.url, fetchOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if ("id" in res) {
          this.setState({
            status: "Account made successfully!",
            accountMade: true
          })
        } else {
          this.setState({"status":"Please enter all information correctly."})
        }
      })
      .catch(() => console.log("Failed"));
  }

  changeFirstNameHandler = (event) => {
    this.setState({first_name: event.target.value});
  }

  changeLastNameHandler = (event) => {
    this.setState({last_name: event.target.value});
  }

  changeUsernameHandler = (event) => {
    this.setState({username: event.target.value});
  }

  changeEmailHandler = (event) => {
    this.setState({email: event.target.value});
  }

  changePasswordHandler = (event) => {
    this.setState({password: event.target.value});
  }

  clickLogIn = () => {
    this.props.history.push("/")
  }

  render() {
    const { status } = this.state;
    return (
      <div>
        <div>
          <input className="sign_up_fields" type="text" value={this.state.first_name} onChange={this.changeFirstNameHandler}
          placeholder="First Name">
          </input>
        </div>
        <div>
          <input className="sign_up_fields" type="text" value={this.state.last_name} onChange={this.changeLastNameHandler}
          placeholder="Last Name">
          </input>
        </div>
        <div>
          <input className="sign_up_fields" type="text" value={this.state.username} onChange={this.changeUsernameHandler}
          placeholder="Username">
          </input>
        </div>
        <div>
          <input className="sign_up_fields" type="text" value={this.state.email} onChange={this.changeEmailHandler}
          placeholder="Email"/>
        </div>
        <div>
          <input className="sign_up_fields" type="password" value={this.state.password} onChange={this.changePasswordHandler} 
          placeholder="Password" >
          </input>
        </div>
        <div id="signUpButton">
          <SignUpButton signUpClick={this.handleClick}/>
          {status !== '' && (<p>{status}</p>)}
          {this.state.accountMade === true && 
          (<span
            id="signup"
            onClick={this.clickLogIn}>
            Log in
          </span>)}
        </div>
      </div>
    );
  }
}

export default withRouter(SignUpForm);