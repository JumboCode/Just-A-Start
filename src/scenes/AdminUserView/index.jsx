import React, { Component } from 'react';
import axios from 'axios';
import {
  withRouter
} from "react-router-dom";
import Navbar from '../../components/Navbar/index';
import AdminSideBar from '../../components/AdminSideBar/index';
import ProfileEdit from './components/ProfileEdit/index';
import Jobs from './components/Jobs/index';
import Educations from './components/Educations/index';
import { config } from '../../Constants'
import './styles.css';

class AdminUserView extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.profileEditElement = React.createRef();
    this.state = {
      id: this.props.location.state.id
    }
  }

  componentDidMount = () => {
    const key = this.props.authToken

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${key}`
      },
    };

    axios(`${config.url.API_URL}/api/admin_user/${this.state.id}/`, options)
      .then(res => {
        console.log(res)
        this.setState({
          username: res['data']['username'],
          first_name: res['data']['first_name'],
          last_name: res['data']['last_name'],
          email: res['data']['email'],
        });
      })
      .catch(err => {
        console.log("FAIL " + err);
      });
    
    fetch(`${config.url.API_URL}/api/admin_alumnus/`, options)
      .then(res => res.json())
      .then(res => {
        var item
        var userData = res['results']
        
        for (item of userData) {
          if (item.user_id === this.state.id) {
            this.setState({
              phone: item['phone_number'],
              birthdate: item['date_of_birth'],
              alumnus_id: item['id'],
            })
          }  
        }
      })
      .catch(err => {
        console.log("FAIL " + err);
      });
  }
  
  profileEditClicked = () => {
    console.log(this.state)
    this.profileEditElement.current.changeVisibilityOn(this.state.first_name, 
    this.state.last_name, this.state.birthdate, 
    this.state.phone, this.state.email);
  };
  
  handler(first_name, last_name, birthdate, phone, email){
    this.setState({
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      email: email,
      birthdate: birthdate,
    })

    // Send data back to server
    const key = this.props.authToken
    const user_model = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${key}`
      },
      body: JSON.stringify({
        "first_name": first_name,
        "last_name": last_name,
        "email": email
      })
    };

    fetch(`${config.url.API_URL}/api/users/${this.state.user_id}/`, user_model)
      .then(res => res.json())
      .catch(err => {
        console.log("FAIL " + err);
      });

    const alumnus_model = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${key}`
      },
      body: JSON.stringify({
        "date_of_birth": birthdate,
        "phone_number": phone
      })
    };

    fetch(`${config.url.API_URL}/api/alumnus/${this.state.alumnus_id}/`, alumnus_model)
      .then(res => res.json())
      .catch(err => {
        console.log("FAIL " + err);
      });
  }

  render(){
    const background = {
      width: "100%",
      height: 2000,
      backgroundColor: "#eef6fe",
      zIndex: 0,
    }

    const z_index2 = {
      zIndex: 2,
    }

    const full_name = this.state.first_name + " " + this.state.last_name

    return(
      <div>
        <div className="bars">
          <AdminSideBar style={z_index2} id={1}/>
          <Navbar name={full_name} type="Admin" token={this.props.authToken}/>
        </div>
        
        <div style={background}>
          <ProfileEdit handler={this.handler} ref={this.profileEditElement}/>
          <div id="allthestuff">
            <div className = "profile">
              <div className = "top_text">
                <h1 className = "title">Profile</h1>
              </div>
              <h1 className = "centered">{this.state.first_name} {this.state.last_name}</h1>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Username</p>
                <p className = "right_text_profile">{this.state.username}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Phone</p>
                <p className = "right_text_profile">{this.state.phone}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Email</p>
                <p className = "right_text_profile">{this.state.email}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Date Of Birth</p>
                <p className = "right_text_profile">{this.state.birthdate}</p>
              </div>
            </div>

            <div className = "experiences">
              <div className = "top_text">
                <h1 className = "title">Experiences</h1>
              </div>

              <Jobs authToken={this.props.authToken} id={this.state.id}/>
              <Educations authToken={this.props.authToken} id={this.state.id}/>
            </div> 
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AdminUserView);