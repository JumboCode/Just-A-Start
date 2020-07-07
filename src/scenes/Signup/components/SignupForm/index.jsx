import React, { Component } from 'react';
import './styles.css';

class SignUpForm extends Component {
    state = {
      username: "",
      password1: "",
      password2: "",
      email: "",
      url: "http://127.0.0.1:8000/api/rest-auth/registration/"

    };

    componentDidUpdate = (prevProps, prevState) => {
      if (prevProps.isClicked !== this.props.isClicked) {
        console.log(this.state.username);
        
        console.log(this.state.email);
        //this.props.getUserInfo(this.state.username, this.state.password);
        this.sendRegisterRequest(this.state.username, this.state.password1, this.state.password2, this.state.email);
      }


    }

    sendRegisterRequest = (u, p1, p2, e) => {
        // Will do later
        let obj = {
            'username': u,
            'email': e,
            'password1': p1,
            'password2': p2
        };
        console.log(JSON.stringify(obj));
        fetch(this.state.url, 
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(obj)
          })
        .then((response) => response.json)
        .catch(() => console.log("Failed"));

    }

    setFields = () => {
      this.setState({username: this._un.value, password: this._ps.value});
    }

    changeUsernameHandler = (event) => {
      this.setState({username: event.target.value});
    }
    changePasswordHandler1 = (event) => {
      this.setState({password1: event.target.value});
    }
    changePasswordHandler2 = (event) => {
      this.setState({password2: event.target.value});
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
              <input className="sign_up_fields" ref={(el) => this._ps = el} type="password" value={this.state.password1}
              onChange={this.changePasswordHandler1} placeholder="Password" >
              </input>
            </div>
            <div>
              <input className="sign_up_fields" ref={(el) => this._ps = el} type="password" value={this.state.password2}
              onChange={this.changePasswordHandler2} placeholder="Confirm Password" >
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
