import React, { Component } from 'react';
import './App.css';
import { 
  BrowserRouter, 
  Route, 
  Switch, 
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./pages/LoginForm";
import NavbarPage from "./pages/user_navbar";
import NotFoundPage from "./pages/404";
import Navbar from './pages/Navbar';
import AdminSendMsg from './pages/AdminSendMsg';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route
            exact path="/admin-login"
            render={props => (
              <LoginForm submitEndpoint="/xxx" {...props}/>
          )}/>
          <Route
            exact path="/alumni-login"
            render={props => (
              <LoginForm submitEndpoint="/xxx" {...props}/>
          )}/>
          <Route exact path="/admin-dash" component={AdminSendMsg} />
          <Route
            exact
            path="/user-navbar"
            render={props => (
              <NavbarPage submitEndpoint="/xxx" {...props}/>
          )}/>
          <Route exact path="/" component={LoginPage} />
          <Route component={NotFoundPage}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;