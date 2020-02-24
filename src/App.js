import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import AdminDashboard from './pages/AdminDashboardBody';
import AdminNotification from './pages/AdminSendMsg';
import AdminUserList from './pages/AdminUserList';
import UserDashboard from './pages/UserDashboard';
import NotFoundPage from "./pages/404";
import SignUp from "./pages/SignUp";
import UserNavbar from './components/UserNavbar.jsx';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={UserLogin}/>
          <Route exact path="/user-dashboard" component={UserDashboard} />
          <Route exact path="/admin-login" component={AdminLogin} />
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
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
