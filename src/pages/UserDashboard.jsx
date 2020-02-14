import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';
import JobEntry from '../components/JobEntry.jsx';
import UserNavbar from '../components/UserNavbar.jsx';
import ProfileEdit from '../components/ProfileEdit.jsx';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.profileEditElement = React.createRef();
    this.state = {
      profile_edit: "false",
      job_data: [
        {
          job_title: "Job Title",
          company: "Company",
          city: "City",
          job_length: "2015 - Present",
          hours_per_week: 38,
          salary: 96000,
          description: [{
                          id: 1,
                          text: "Determines operational feasability by evaluating analysis, problem definition, requirements, solution development, and proposed solutions"
                        },
                        {
                          id: 2,
                          text: "Documents and demonstrates solutions by devloping documentation, flowcharts, layouts, diagrams, charts, code comments and clear code."
                        },
                        {
                          id: 3,
                          text: "Prepares and installs solutions by determining and designing system specifications, standards, and programming."
                        }],
          id: 1
        }
      ],
      
      profile_data: {
        name: "Jackson Smith",
        class: "... of 2008",
        location: "Boston, MA",
        about: "I am a software engineer",
        phone: "+(617)-565-1234",
        email: "Jacksonsmith@gmail.com",
        birthdate: "01/12/1991"
      }

    }
  }
  profileEditClicked = () => {
      //this.setState({ profile_edit: "true" });
      this.profileEditElement.current.changeVisibilityOn(this.state.profile_data.name, this.state.profile_data.birthdate, this.state.profile_data.location, this.state.profile_data.phone, this.state.profile_data.email, this.state.profile_data.about);
  };
  handler(name, dob, location, phone, email, about){
    console.log(this.state.profile_data.name);
    this.state.profile_data.name = name;
    this.state.profile_data.location = location;
    this.state.profile_data.about = about;
    this.state.profile_data.phone = phone;
    this.state.profile_data.email = email;
    this.state.profile_data.birthdate = dob;
    this.forceUpdate();
  }


  render(){
    const background = {
      //"background-color":'EEF6FE'
      width: "100%",
      height: 2000,
      backgroundColor: "#eef6fe",
      position: "absolute"
    }

    const { profile_data } = this.state;

    return(
      <body>
        <UserNavbar/>
        <div style = {background}>
          <ProfileEdit handler = {this.handler} ref={this.profileEditElement}/>
          <div id="allthestuff">
            <div className = "profile">
              <div className = "top_text">
                <h1 className = "title">Profile</h1>
                <button onClick={this.profileEditClicked} className = "add" id = "edit">&#9998;</button>
              </div>
              <h1 className = "centered">{profile_data.name}</h1>
              <p className = "centered" id = "small">{profile_data.class}</p>
              <p className = "centered" id = "medium">{profile_data.location}</p>
              <div className = "flex_container_two">
                <p className = "left_text_profile">About</p>
                <p className = "right_text_profile">{profile_data.about}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Phone</p>
                <p className = "right_text_profile">{profile_data.phone}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Email</p>
                <p className = "right_text_profile">{profile_data.email}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Date Of Birth</p>
                <p className = "right_text_profile">{profile_data.birthdate}</p>
              </div>
            </div>
            <div className = "job_list">
              <div className = "top_text">
                <h1 className = "title">Job Experience</h1>
                <button className = "add">+</button>
              </div>
            {this.state.job_data.map(item => (<JobEntry data={item} key={item.id}/>))}
            </div>
          </div>

        </div>
      </body>
    )
  }
}

export default UserDashboard;
