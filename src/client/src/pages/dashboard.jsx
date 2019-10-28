import React, { Component } from 'react';
import './dashboard.css';


class DashBoard extends Component {
    state = {

    };


    constructor() {
        super();
    }

    render() {
        return (
          <div className="wrapper-dashboard">
            <div id="top">
              <span id="x-mark"> X </span>
              <span id="dash-mark"> ((())) </span>
            </div>

            <div className="dashboard-button">
              <span> Dashboard </span>
            </div>
            <div className="dashboard-button">
              <span> Users </span>
            </div>
            <div className="dashboard-button">
              <span> Notification </span>
            </div>
          </div>
        );
    }


}

export default DashBoard;
