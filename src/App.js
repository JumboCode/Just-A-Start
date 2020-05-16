import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
  // Redirect,
} from "react-router-dom";

import PrivateRouteAdmin from "./components/PrivateRouteUser/index";
import PrivateRouteUser from "./components/PrivateRouteAdmin/index";
// import PublicRoute from "./components/PublicRoute/index";
import Login from "./scenes/Login/index";
import SignUp from "./scenes/Signup/index"
import AdminDashboard from './scenes/AdminDashboard/index';
import AdminNotification from './scenes/AdminNotification/index';
import UserDashboard from './scenes/UserDashboard/index';
import NotFoundPage from "./scenes/NotFound/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAdmin: false,
      authToken: "",
      pk: "",
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
    const { isAuthenticated, authToken} = this.state;
    // var {isUser, isAdmin} = this.state;

    if ((prevState.isAuthenticated !== isAuthenticated) && isAuthenticated && authToken !== '') {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${authToken}`
        },
        // params: {'key': '5909dcfffb5c09d2a35e2db838e0af0a3c5e75b4'}
      }

      console.log(authToken)

      fetch(`http://127.0.0.1:8000/api/user/get_user_profile/?key=${authToken}`, fetchOptions)
        .then(res => res.json())
        .then(res => {
          const status = res[0]['fields']['admin']
          if (status === true) {
            this.setState({
              isAdmin: true,
            })
          } else {
            this.setState({
              isAdmin: false,
            })
          }
          
        }).catch(err => {
          console.log(err);
        })
    }
  }    

  render() {
    // const { isAuthenticated, isAdmin } = this.state;
    console.log(this.state);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Login setAuthToken={this.setAuthToken} />} />
          <Route exact path="/sign-up" component={SignUp} />
          <PrivateRouteAdmin authToken={this.state.authToken} isAdmin={this.state.isAdmin} exact path="/admindashboard" component={AdminDashboard} />
          <PrivateRouteAdmin authToken={this.state.authToken} isAdmin={this.state.isAdmin} exact path="/adminnotification" component={AdminNotification} />
          <PrivateRouteUser authToken={this.state.authToken} isAdmin={this.state.isAdmin} exact path="/userdashboard" component={UserDashboard}/>
          {/* <Route exact path="/userdashboard" component={UserDashboard} /> */}
          <Route component={NotFoundPage}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
