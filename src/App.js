import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import UserLogin from "./pages/UserLogin";
import AdminNotification from './pages/AdminSendMsg';
import AdminUserList from './pages/AdminUserList';
import UserDashboard from './pages/UserDashboard';
import NotFoundPage from "./pages/404";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={UserLogin}/>
          <Route exact path="/user-dashboard" component={UserDashboard} />
          <Route exact path="/admin-notification" component={AdminNotification} />
          <Route exact path="/admin-userlist" component={AdminUserList} />
          <Route component={NotFoundPage}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
