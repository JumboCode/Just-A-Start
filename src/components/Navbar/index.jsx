import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import arrow from '../../assets/arrow.png';
import './styles.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        window.localStorage.removeItem('jaysbautht');
        fetch('http://localhost:8000/api/rest-auth/logout/', {method: 'POST'})
            .then((res) => {
                this.props.history.push('/');
            })
    }
    render() {
        return (
            <div className = "container_a">

                <div className = "top-right-thingy">
                    <div className = "vertically-align-thingy">
                       <h2 className = "space-between-headers">Name</h2>
                       <h3 className = "space-between-headers">Role</h3>
                    </div>

                    <img className= "arrow-size" src={arrow} alt="arrow" />
                  <div class="dropdown-content">
                    <a id = "logout" onClick={this.onLogoutClick}> Logout</a>
                  </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Navbar)