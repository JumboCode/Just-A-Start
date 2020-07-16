import React from 'react';
import {
    Route,
    withRouter,
    Redirect
} from "react-router-dom";

const PublicRoute = ({ component: Component, authToken, isAdmin, ...rest}) => {
  return (
    <Route 
      {...rest} 
      render = { props => {
        if (isAdmin === true) {
            return <Redirect to="/admindashboard"/>
        }
        else {
            return <Redirect to="/userdashboard"/>
        }
      }
    } />
  )
}

export default withRouter(PublicRoute);