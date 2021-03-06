import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import PrivateRouteAdmin from "./components/PrivateRouteAdmin/index";
import PrivateRouteUser from "./components/PrivateRouteUser/index";
import Login from "./scenes/Login/index";
import SignUp from "./scenes/Signup/index"
import AdminDashboard from './scenes/AdminDashboard/index';
import AdminNotification from './scenes/AdminNotification/index';
import AdminUserView from './scenes/AdminUserView/index';
import UserDashboard from './scenes/UserDashboard/index';
import NotFoundPage from "./scenes/NotFound/index";
import NotAuthenticated from "./scenes/NotAuthenticated/index";
import { config } from './Constants'

// import PublicRoute from "./components/PublicRoute/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAdmin: false,
      authToken: "",
    }
    this.setAuthToken = this.setAuthToken.bind(this)
    this.setIsAdmin = this.setIsAdmin.bind(this)
  }

  setAuthToken(token) {
    window.localStorage.setItem('jaysbautht', token);
    this.setState({
      authToken: token,
      isAuthenticated: true,
    });
  }

  setIsAdmin(status) {
    this.setState({
      isAdmin: status,
    });
  }

  componentDidMount() {
    const key = window.localStorage.getItem('jaysbautht');
    if (key != null) {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${key}`
        },
      }
  
      fetch(`${config.url.API_URL}/api/users/`, fetchOptions)
          .then(res => res.json())
          .then(res => {
            const status = res['results'][0]['is_staff']
            if (status === true) {
              this.setState({
                isAdmin: true,
                isAuthenticated: true,
                authToken: key,
              })
            } else {
              this.setState({
                isAdmin: false,
                isAuthenticated: true,
                authToken: key,
              })
            }
          }).catch(err => {
            console.log(err);
          })
    }
  }

  render() {
    const {authToken, isAuthenticated, isAdmin} = this.state

    if (!this.state.isAuthenticated) {
      return (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={() => <Login setAuthToken={this.setAuthToken} setIsAdmin={this.setIsAdmin}/>} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/admindashboard" component={NotAuthenticated} />
              <Route exact path="/adminnotification" component={NotAuthenticated} />
              <Route exact path="/userdashboard" component={NotAuthenticated} />
              <Route component={NotFoundPage}></Route>
            </Switch>
            </BrowserRouter>
      )
    }

    return (
      <BrowserRouter>
        <Switch>
          {/* <PublicRoute exact path="/" component={() => <Login setAuthToken={this.setAuthToken} setIsAdmin={this.setIsAdmin}/>} /> */}
          <Route exact path="/" component={() => <Login setAuthToken={this.setAuthToken} setIsAdmin={this.setIsAdmin}/>} />
          <PrivateRouteAdmin authToken={authToken} isAuthenticated={isAuthenticated} isAdmin={isAdmin} exact path="/admindashboard" component={AdminDashboard} />
          <PrivateRouteAdmin authToken={authToken} isAuthenticated={isAuthenticated} isAdmin={isAdmin} exact path="/adminnotification" component={AdminNotification} />
          <PrivateRouteAdmin authToken={authToken} isAuthenticated={isAuthenticated} isAdmin={isAdmin} exact path="/adminuserview" component={AdminUserView} />
          <PrivateRouteUser authToken={authToken} isAuthenticated={isAuthenticated} isAdmin={isAdmin} exact path="/userdashboard" component={UserDashboard} />
          <Route component={NotFoundPage}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
