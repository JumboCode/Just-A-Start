import React from 'react';
import {
  Route,
  Redirect,
  withRouter
} from "react-router-dom";

const PrivateRouteAdmin = ({ component: Component, authToken, isAuthenticated, isAdmin, pk, ...rest}) => {
  return (
    <Route 
      {...rest} 
      render = { props => {
        if (isAuthenticated === true && isAdmin === true) {
          return <Component authToken={authToken} pk={pk} {...props} />
        } else if (isAuthenticated === true){
          return <Redirect to="/userdashboard"/>
        } else {
          return <Redirect to="/"/>
        }
      }
    } />
  )
}

export default withRouter(PrivateRouteAdmin);