import React, { Component } from 'react';
import {
  withRouter
} from "react-router-dom";
import Navbar from '../../components/Navbar/index';
import ProfileEdit from './components/ProfileEdit/index';
import Jobs from './components/Jobs/index';
import Educations from './components/Educations/index';
import './styles.css';

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.profileEditElement = React.createRef();
    this.state = {
      profile_data: {
      }
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

    fetch(`http://127.0.0.1:8000/api/user/get_user_profile/?key=${key}`, options)
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        this.setState({
          profile_data: {
            name: res[0]['fields']['first_name'] + " " + res[0]['fields']['last_name'],
            email: res[0]['fields']['email'],
            phone: res[0]['fields']['phone'],
            birthdate: res[0]['fields']['date_of_birth']
          }
        });
      })
      .catch(err => {
        console.log("FAIL " + err);
      });
  }
  
  profileEditClicked = () => {
      this.profileEditElement.current.changeVisibilityOn(this.state.profile_data.name, 
        this.state.profile_data.birthdate, this.state.profile_data.phone, this.state.profile_data.email);
  };
  
  handler(name, dob, phone, email){
    console.log(this.state.profile_data.name);
    this.setState({
      name: name,
      phone: phone,
      email: email,
      birthdate: dob,
    })
    this.forceUpdate();
  }

  render(){
    const background = {
      width: "100%",
      height: 2000,
      backgroundColor: "#eef6fe",
      position: "absolute"
    }

    return(
      <div>
        <Navbar/>
        <div style = {background}>
          <ProfileEdit handler = {this.handler} ref={this.profileEditElement}/>
          <div id="allthestuff">
            <div className = "profile">
              <div className = "top_text">
                <h1 className = "title">Profile</h1>
                <button onClick={this.profileEditClicked} className = "add" id = "edit">&#9998;</button>
              </div>
              <h1 className = "centered">{this.state.profile_data.name}</h1>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Phone</p>
                <p className = "right_text_profile">{this.state.profile_data.phone}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Email</p>
                <p className = "right_text_profile">{this.state.profile_data.email}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Date Of Birth</p>
                <p className = "right_text_profile">{this.state.profile_data.birthdate}</p>
              </div>
            </div>

            <div className = "job_list">
              <div className = "top_text">
                <h1 className = "title">Experiences</h1>
              </div>

              <Jobs authToken={this.props.authToken}/>
              <Educations authToken={this.props.authToken}/>
            </div> 
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserDashboard);