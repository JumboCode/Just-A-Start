import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';
import JobEntry from './JobEntry.jsx';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render(){
    const background = {
      //"background-color":'EEF6FE'
      width: "auto",
      height: 2000,
      backgroundColor: "#eef6fe",
    }
    
    const { profile_data } = this.state;

    return(
      <div style = {background}>
        <div className = "profile">
          <h1 className = "centered">Profile</h1>
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
    )
  }
}

export default UserDashboard;
