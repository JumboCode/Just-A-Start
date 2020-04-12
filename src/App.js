import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./pages/Login";
import AdminNotification from './pages/AdminSendMsg';
import AdminUserList from './pages/AdminUserList';
import UserDashboard from './pages/UserDashboard';
import NotFoundPage from "./pages/404";
import SignUp from "./pages/SignUp"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      authToken: "",
      profile: []
    }
    this.setAuthToken = this.setAuthToken.bind(this);
  }

  setAuthToken(token) {
    window.localStorage.setItem('jaysbautht', token);
    this.setState({
      authToken: token,
      isAuthenticated: true,
    });
  }

  componentDidMount() {
    // window.localStorage.removeItem('jaysbautht');
    const key = window.localStorage.getItem('jaysbautht');

    if (key) {
      this.setState({
        isAuthenticated: true,
        authToken: key
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isAuthenticated, authToken } = this.state;
    if ((prevState.isAuthenticated !== isAuthenticated) && 
        isAuthenticated && authToken !== '') {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${authToken}`
        },
      }
      fetch('http://127.0.0.1:8000/api/user/', fetchOptions)
        .then(res => res.json())
        .then(res => {
          this.setState({
            authToken: authToken,
            profile: res,
            isAuthenticated: true,
          });
        }).catch(err => {
          console.error(err);
        })
    }
  }        


  render() {
    const { isAuthenticated } = this.state;
    console.log(this.state);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Login setAuthToken={this.setAuthToken} />} />
          <Route path="/user-dashboard" component={UserDashboard} />
          <Route path="/admin-notification" component={AdminNotification} />
          <Route path="/admin-userlist" component={AdminUserList} />
          <Route path="/sign-up" component={SignUp} />
          <Route component={NotFoundPage}></Route>
        </Switch>
        {isAuthenticated && <Redirect to="/user-dashboard" />}
      </BrowserRouter>
    )
  }
}

export default App;
