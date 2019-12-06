import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import HomePage from "./pages/Homepage";
import AdminDashboard from './pages/AdminDashboardBody';
import AdminNotification from './pages/AdminSendMsg';
import AdminUserList from './pages/AdminUserList';
import UserDashboard from './pages/UserDashboard';
import Login from "./pages/Login";

import NavbarPage from "./components/UserNavbar";
import Navbar from './components/Navbar';
import SideDashBoard from './components/SideDashBoard';
import NotFoundPage from "./pages/404";



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/admin-login" component={Login} />
          <Route exact path="/user-login" component={Login}/>
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/admin-notification" component={AdminNotification} />
          <Route exact path="/admin-userlist" component={AdminUserList} />
          <Route exact path="/user-dashboard" component={UserDashboard} />
          {/* <Route exact path="/user-navbar"
            render={props => (
              <NavbarPage submitEndpoint="/xxx" {...props}/>
          )}/> */}

          <Route component={NotFoundPage}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
