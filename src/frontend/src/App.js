import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import LoginPage from "./pages/Homepage";
import Login from "./pages/login";
import NavbarPage from "./pages/user_navbar";
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboardBody';
import AdminNotification from './pages/AdminSendMsg';
import AdminUserList from './pages/UsersBody.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import NotFoundPage from "./pages/404";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/admin-login" component={Login} />
          <Route exact path="/user-login" component={Login}/>
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/admin-notification" component={AdminNotification} />
          <Route exact path="/admin-userlist" component={AdminUserList} />
          <Route exact path="/user-dashboard" component={UserDashboard} />
          <Route exact path="/user-navbar"
            render={props => (
              <NavbarPage submitEndpoint="/xxx" {...props}/>
          )}/>
          
          <Route component={NotFoundPage}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
