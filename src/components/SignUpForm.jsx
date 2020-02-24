import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SignUpForm.css';

class SignUpForm extends Component {
    state = {
      username: "",
      password: "",
      email: "",
      url: "http://127.0.0.1:8000/api/rest-auth/registration/"

    };

    componentDidUpdate = (prevProps, prevState) => {
      if (prevProps.isClicked != this.props.isClicked) {
        console.log(this.state.username);
        console.log(this.state.password);
        console.log(this.state.email);
        //this.props.getUserInfo(this.state.username, this.state.password);
        this.sendRegisterRequest(this.state.username, this.state.password, this.state.email);
      }


    }

    sendRegisterRequest = (u, p, e) => {
        // Will do later
        let res = fetch(this.state.url);
        res
        .then((response) => console.log(response.json.parse()))
        .catch(() => console.log("Failed"));

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
    changeEmailHandler = (event) => {
      this.setState({email: event.target.value});
  
    }

    render() {
        return (
          <div>
            <span id="sign_up_label"> Sign Up </span>
            <div>
              <input className="sign_up_fields" ref={(el) => this._un = el} type="text" value={this.state.username}
              onChange={this.changeUsernameHandler} placeholder="Username">
              </input>
            </div>

            <div>
              <input className="sign_up_fields" ref={(el) => this._ps = el} type="password" value={this.state.password}
              onChange={this.changePasswordHandler} placeholder="Password" >
              </input>
            </div>
            <div>
              <input className="sign_up_fields" type="text" value={this.state.email} onChange={this.changeEmailHandler}
              placeholder="Email"/>
            </div>
          </div>
        );
    }
}

export default SignUpForm;
