import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./pages/Login";
import AdminNotification from './pages/AdminSendMsg';
import AdminUserList from './pages/AdminUserList';
import UserDashboard from './pages/UserDashboard';
import NotFoundPage from "./pages/404";
import SignUp from "./pages/SignUp"
import AdminUserView from './pages/AdminUserView';

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

      fetch(`http://127.0.0.1:8000/api/user/get_user_profile/?key=${authToken}`, fetchOptions)
        .then(res => {
          console.log(res.json())
          console.log(res.body)
          console.log(res.body['isAdmin'])
          const status = res.body['isAdmin']
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
    const { isAuthenticated, isAdmin } = this.state;
    console.log(this.state);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Login setAuthToken={this.setAuthToken} />} />
          <Route path="/user-dashboard" component={UserDashboard} />
          <Route path="/admin-notification" component={AdminNotification} />
          <Route path="/admin-userlist" component={AdminUserList} />
          <Route path="/admin-userview" 
            render={(props) => <AdminUserView {...props} birthdate={"asda"} />}
          />
          <Route path="/sign-up" component={SignUp} />
          <Route component={NotFoundPage}></Route>
        </Switch>
        {/* {isAuthenticated === false && <Redirect to="/" />} */}
        {isAuthenticated && !isAdmin && <Redirect to="/user-dashboard" />}
        {isAuthenticated && isAdmin && <Redirect to="/admin-userlist" />}
      </BrowserRouter>
    )
  }
}

export default App;
