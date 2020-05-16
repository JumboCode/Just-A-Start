import React from 'react';
import {
    Route,
    withRouter,
    Redirect
} from "react-router-dom";

const PublicRoute = ({ component: Component, authToken, ...rest}) => {
    const key = window.localStorage.getItem('jaysbautht')
    var authenticated = false
    if (key) {
        authenticated = true
    }
    return (
        <Route 
            {...rest} 
            render = { props => {
                if (authenticated === true) {
                    return <Redirect to="/search"/>
                }
                else {
                    return <Component {...props}/>
                }
            }
        } />
    )
}

export default withRouter(PublicRoute);