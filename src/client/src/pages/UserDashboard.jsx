import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';
import JobEntry from './JobEntry.jsx';

class UserDashboard extends React.Component {
  render(){
    const background = {
      //"background-color":'EEF6FE'
      width: "auto",
      height: 2000,
      "background-color": "#eef6fe"
    }
    return(
      <body style = {background}>
        <div class = "profile">
          <h1 class = "centered">Profile</h1>
          <h1 class = "centered">Jackson Smith</h1>
          <p class = "centered" id = "small">Class of 2008</p>
          <p class = "centered" id = "medium">Boston, USA</p>
          <div class = "flex_container_two">
            <p class = "left_text_profile">About</p>
            <p class = "right_text_profile">I am a software engineer . . . . .  . . . . . . . . . . . . . . . . .  . . . . . . . . . . . .</p>
          </div>
          <div class = "flex_container_two">
            <p class = "left_text_profile">Phone</p>
            <p class = "right_text_profile">+(617)-565-1234</p>
          </div>
          <div class = "flex_container_two">
            <p class = "left_text_profile">Email</p>
            <p class = "right_text_profile">Jacksonsmith@gmail.com</p>
          </div>
          <div class = "flex_container_two">
            <p class = "left_text_profile">Date Of Birth</p>
            <p class = "right_text_profile">01/12/1991</p>
          </div>
        </div>
        <div class = "job_list">
          <div class = "top_text">
            <h1 class = "title">Job Experience</h1>
            <button class = "add">+</button>
          </div>
          <div>
            <JobEntry jobname = {"Job 1"}/>
          </div>
          <div>
            <JobEntry jobname = {"Job 2"}/>
          </div>
          <div>
            <JobEntry jobname = {"Job 3"}/>
          </div>
        </div>
      </body>
    )
  }
}

export default UserDashboard;
