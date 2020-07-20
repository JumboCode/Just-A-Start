import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import arrow from '../../assets/arrow.png';
import './styles.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onDisplayClick = this.onDisplayClick.bind(this);
    this.state = {
      dropdownVisible: false,
    }
  }

  onDisplayClick() {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });
  }

  onLogoutClick() {
    window.localStorage.removeItem('jaysbautht');
    const key = this.props.token
    console.log(key)

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${key}`
      },
    };

    fetch('http://localhost:8000/logout/', options)
      .then((res) => {
        this.props.history.push('/');
      })
  }
  
  render() {
    console.log(this.state)
    return (
      <div className="container_a">
        <div className="top-right-thingy">
          <div className="vertically-align-thingy">
            <p className="space-between-headers">{this.props.name}</p>
            <p className="space-between-headers">{this.props.type}</p>
          </div>

          <img className="arrow-size" src={arrow} alt="arrow" onClick={this.onDisplayClick}/>
            {this.state.dropdownVisible && 
            <div id="dropdown-content">
              <p id="logout" onClick={this.onLogoutClick}>Logout</p>
            </div>
            }
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar)
