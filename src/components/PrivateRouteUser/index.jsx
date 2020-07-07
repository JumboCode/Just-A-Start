import React from 'react';
import {
  Route,
  Redirect,
  withRouter
} from "react-router-dom";

const PrivateRouteUser = ({ component: Component, authToken, isAuthenticated, isAdmin, pk, ...rest}) => {
  return (
    <Route 
      {...rest} 
      render = { props => {
        if (isAuthenticated === true && isAdmin === false) {
          return <Component authToken={authToken} pk={pk} {...props}/>
        } else if (isAuthenticated === true) {
          return <Redirect to="/admindashboard"/>
        } else {
          return <Redirect to="/"/>
        }
      }
    }/>
  )
}

export default withRouter(PrivateRouteUser);