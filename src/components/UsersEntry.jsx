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
          
          <div class = "flex_container_users_entry">
            <div id = "special_item_users_entry" class = "item_users_entry">
              <img id = "profilepic" src={ProfilePic} />
            </div>
            <div class = "item_users_entry">
              <p id = "regular_users_entry"><a href={data.profile}>{data.username}</a></p>
            </div>
            <div class = "item_users_entry">
              <p id = "regular_users_entry">{data.name_first}</p>
            </div>
            <div class = "item_users_entry">
              <p id = "regular_users_entry">{data.name_last}</p>
            </div>
            <div class = "item_users_entry">
              <p id = "small_margin">{data.email}</p>
            </div>
            <div class = "item_users_entry">
              <p id = "regular_users_entry">{data.phone}</p>
            </div>
            <div class = "item_users_entry">
              <p id = "regular_users_entry">{data.last_login}</p>
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
