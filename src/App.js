import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
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
    }
    this.setAuthToken = this.setAuthToken.bind(this);
  }

  setAuthToken(token) {
    console.log(`setting auth token to ${token}`);
    this.setState({
      authToken: token,
      isAuthenticated: true,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Login setAuthToken={this.setAuthToken} />} />
          <Route exact path="/user-dashboard" component={UserDashboard} />
          <Route exact path="/admin-notification" component={AdminNotification} />
          <Route exact path="/admin-userlist" component={AdminUserList} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route component={NotFoundPage}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
