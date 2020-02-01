import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UsersEntry.css';
import ProfilePic from '../assets/profilepic.png'
import PropTypes from 'prop-types';

class UserActivityEntry extends React.Component {
  render(){
    const { data } = this.props;
    return(
      <body>
        <div>
          <hr noshade></hr>
          <img src={ProfilePic} />
          <div class = "flex_container">
            <div class = "item">
              <p id = "regular" id = "medium">{data.username}</p>
            </div>
            <div class = "item">
              <p id = "regular" id = "medium">{data.name_first}</p>
            </div>
            <div class = "item">
              <p id = "regular" id = "medium">{data.name_last}</p>
            </div>
            <div class = "item">
              <p id = "small_margin">{data.email}</p>
              <p id = "small_margin">{data.phone}</p>
            </div>
            <div class = "item">
              <p id = "regular">{data.last_login}</p>
            </div>
          </div>
        </div>
      </body>
    )
  }
}

UserActivityEntry.propTypes = {
  data: PropTypes.shape({
    time: PropTypes.string,
    name: PropTypes.string,
    change_type: PropTypes.string,
    change_desc: PropTypes.string,
    user_type: PropTypes.string,
    id: PropTypes.isRequired,
  })
}

UserActivityEntry.defaultProps = {
  data: {
    time: '',
    name: '',
    change_type: '',
    change_desc: '',
    user_type: '',
    id: PropTypes.isRequired,
  }
}

export default UserActivityEntry;
