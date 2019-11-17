import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UsersEntry.css';
import ProfilePic from '../assets/profilepic.png'

class UserActivityEntry extends React.Component {
  render(){
    return(
      <body>
        <div>
          <hr noshade></hr>
          <img src={ProfilePic} />
          <div class = "flex_container">
            <div class = "item">
              <p id = "regular" id = "medium">KBrown01</p>
            </div>
            <div class = "item">
              <p id = "regular" id = "medium">Kate</p>
            </div>
            <div class = "item">
              <p id = "regular" id = "medium">Brown</p>
            </div>
            <div class = "item">
              <p id = "small_margin">katebrown@gmail.com</p>
              <p id = "small_margin">+1(617)-283-1837</p>
            </div>
            <div class = "item">
              <p id = "regular">1 hour ago</p>
            </div>
          </div>
        </div>
      </body>
    )
  }
}

export default UserActivityEntry;
