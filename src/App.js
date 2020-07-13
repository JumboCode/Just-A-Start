import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import PrivateRouteAdmin from "./components/PrivateRouteAdmin/index";
import PrivateRouteUser from "./components/PrivateRouteUser/index";
import PublicRoute from "./components/PublicRoute/index";
import Login from "./scenes/Login/index";
import SignUp from "./scenes/Signup/index"
import AdminDashboard from './scenes/AdminDashboard/index';
import AdminNotification from './scenes/AdminNotification/index';
import UserDashboard from './scenes/UserDashboard/index';
import NotFoundPage from "./scenes/NotFound/index";
import NotAuthenticated from "./scenes/NotAuthenticated/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAdmin: false,
      authToken: "",
      pk: "",
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

    console.log(key)

    if (key != null) {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${key}`
        },
      }
  
      fetch(`http://127.0.0.1:8000/api/user/get_user_profile/?key=${key}`, fetchOptions)
          .then(res => res.json())
          .then(res => {
            const status = res[0]['fields']['admin']
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

  componentDidUpdate(prevProps, prevState) {
    const { isAuthenticated, authToken} = this.state;
    const key = window.localStorage.getItem('jaysbautht');

    if ((prevState.isAuthenticated !== isAuthenticated) && isAuthenticated && authToken !== '') {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${key}`
        },
      }

      fetch(`http://127.0.0.1:8000/api/user/get_user_profile/?key=${key}`, fetchOptions)
        .then(res => res.json())
        .then(res => {
          const status = res[0]['fields']['admin']
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
    console.log(this.state)
    const {authToken, isAuthenticated, isAdmin} = this.state

    if (!this.state.isAuthenticated) {
      return (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={() => <Login setAuthToken={this.setAuthToken} setIsAdmin={this.setIsAdmin}/>} />
              <Route exact path="/sign-up" component={SignUp} />
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
          {/* <Route path="/admin-userview" 
            render={(props) => <AdminUserView {...props} birthdate={"asda"} />}
          /> */}
          <PrivateRouteUser authToken={authToken} isAuthenticated={isAuthenticated} isAdmin={isAdmin} exact path="/userdashboard" component={UserDashboard} />
          <Route component={NotFoundPage}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
