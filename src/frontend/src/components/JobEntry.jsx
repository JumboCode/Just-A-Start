import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './JobEntry.css';
// import UserDashboard from './UserDashboard.jsx';

class JobEntry extends React.Component {
  render(){

    return(
      <div class = "flex_container">
        <div class = "text_container">
          <div id = "left_text">
            <p id = "large" >{this.props.jobname}</p>
            <p id = "medium" >Company</p>
            <p id = "small" >City</p>
          </div>
          <div id = "right_text" >
            <p id = "large" >2015-Present</p>
            <p id = "small" >38 hrs per week</p>
            <p id = "small" >$90k per year</p>
          </div>
        </div>
        <div class = "list">
          <ul >
            <li>Determines operational feasability by evaluating analysis, problem definition, requirements, solution development, and proposed solutions.</li>
            <li>Documents and demonstrates solutions by devloping documentation, flowcharts, layouts, diagrams, charts, code comments and clear code.</li>
            <li>Prepares and installs solutions by determining and designing system specifications, standards, and programming.</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default JobEntry;
