import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import PropTypes from 'prop-types';

class UserActivityEntry extends React.Component {
  render(){
    const { data } = this.props;
    return(
      <div>
        <hr></hr>
        <div className="flex_container_users_entry">
          <div className="item_users_entry">
            <Link className="regular_users_entry" 
              to={{
              pathname: '/adminuserview',
              state: {
                id: this.props.data.id
              }
            }}>{data.username}
            </Link>
          </div>
          <div className="item_users_entry">
            <p id = "regular_users_entry">{data.first_name}</p>
          </div>
          <div className="item_users_entry">
            <p id = "regular_users_entry">{data.last_name}</p>
          </div>
          <div className="item_users_entry">
            <p id = "email">{data.email}</p>
          </div>
          <div className="item_users_entry">
            <p id = "regular_users_entry">{data.phone_number}</p>
          </div>
        </div>
      </div>
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
