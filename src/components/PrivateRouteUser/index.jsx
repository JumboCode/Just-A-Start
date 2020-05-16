import React from 'react';
import {
  Route,
  Redirect,
  withRouter
} from "react-router-dom";

const PrivateRoute = ({ component: Component, authToken, isAdmin, pk, ...rest}) => {
  const key = window.localStorage.getItem('jaysbautht')
  var authenticated = false
  if (key === authToken) {
    authenticated = true
  }

  return (
    <Route 
      {...rest} 
      render = { props => {
        if (authenticated === true && isAdmin === false) {
          // return <Component authToken={authToken} pk={pk} {...props} />
          return <Component authToken={authToken}/>
        }
        else if (authenticated === true) {
          return <Redirect to="/admindashboard"/>
        } else {
          return <Redirect to="/"/>
        }
      }
    }/>
  )
}

export default withRouter(PrivateRoute);