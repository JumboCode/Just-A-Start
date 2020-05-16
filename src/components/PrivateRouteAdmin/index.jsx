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
                if (authenticated === true && isAdmin === true) {
                    return <Component authToken={authToken} pk={pk} {...props} />
                } else if (authenticated === true){
                    return <Redirect to="/userdashboard"/>
                } else {
                    return <Redirect to="/"/>
                }
            }
        } />
    )
}

export default withRouter(PrivateRoute);