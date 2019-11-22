import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './form.css';

class Form extends Component {
    state = {
      username: "",
      password: ""

    };

    componentDidUpdate = (prevProps, prevState) => {
      if (prevProps.isClicked != this.props.isClicked) {
        console.log(this.state.username);
        console.log(this.state.password);
        //this.props.getUserInfo(this.state.username, this.state.password);
        this.sendLoginRequest(this.state.username, this.state.password);
      }


    }

    sendLoginRequest = (u, p) => {

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
        return (
          <div>
            <div>
              <input className="loginInput" ref={(el) => this._un = el} type="text" value={this.state.username}
              onChange={this.changeUsernameHandler} placeholder="Username/Email address">
              </input>
            </div>

            <div>
              <input className="loginInput" ref={(el) => this._ps = el} type="password" value={this.state.password}
              onChange={this.changePasswordHandler} placeholder="Password" >
              </input>
            </div>
            <div>
              <span id="forgotPass" onClick={() => this.props.forgotPassword()}>
              Forgot Password? </span>
            </div>
          </div>
        );
    }
}

export default Form;
