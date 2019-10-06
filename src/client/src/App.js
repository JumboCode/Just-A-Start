import React, { Component } from 'react';
import './App.css';
import { 
  BrowserRouter, 
  Route, 
  Switch, 
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./pages/LoginForm";
import NotFoundPage from "./pages/404";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/admin-login"
            render={props => (
              <LoginForm submitEndpoint="/xxx" {...props}/>
          )}/>
          <Route
            exact
            path="/alumni-login"
            render={props => (
              <LoginForm submitEndpoint="/xxx" {...props}/>
          )}/>
          <Route exact path="/" component={LoginPage} />
          <Route component={NotFoundPage}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;