import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserActivityEntry.css';
import PropTypes from 'prop-types';

class UserActivityEntry extends React.Component {
  render(){
    const { data } = this.props;
    return(
      <body>
        <hr noshade></hr>
        <div class = "flex_container_user_activit">
          <div class = "item">
            <p id = "small_margin">{data.time}</p>
          </div>
          <div class = "item">
            <p id = "small_margin" id = "medium_user_activity">{data.name}</p>
            <p id = "small_margin">{data.user_type}</p>
          </div>
          <div class = "item">
            <p id = "small_margin">{data.change_type}</p>
          </div>
          <div class = "item">
            <p id = "small_margin">{data.change_desc}</p>
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
  }
}

export default UserActivityEntry;
