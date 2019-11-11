import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserActivityEntry.css';

class UserActivityEntry extends React.Component {
  render(){
    return(
      <body>
        <hr noshade></hr>
        <div class = "flex_container_user_activit">
          <div class = "item">
            <p id = "small_margin">3 min ago</p>
            <p id = "small_margin">10/09/2019</p>
            <p id = "small_margin">10:21 am</p>
          </div>
          <div class = "item">
            <p id = "small_margin" id = "medium_user_activity">Kate Brown</p>
            <p id = "small_margin">User</p>
          </div>
          <div class = "item">
            <p id = "small_margin">Update</p>
          </div>
          <div class = "item">
            <p id = "small_margin">Changed a profile photo</p>
          </div>
        </div>
      </body>
    )
  }
}

export default UserActivityEntry;
