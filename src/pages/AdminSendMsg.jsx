import React, { Component } from 'react';
import './AdminSendMsg.css';
import AdminNavBar from '../components/AdminNavbar.jsx';
import SideDashBoard from '../components/SideDashBoard';

class AdminSendMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: [],
      users: [
        {
          username: 'kbrown01',
          first: 'kate',
          last: 'brown',
          phone: '+1(617)-283-1837',
          status: 'ready to send',
          id: 1,
          checked: false,
        },
      ],
      message: ''
    };
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onUserToggle = this.onUserToggle.bind(this);
  }

  componentDidMount() {
    /* add fetch call here once database is ready */
  }

  onMessageChange(e) {
    this.setState({
      message: e.target.value,
    })
  }

  /* when a user's checkbox is toggled, 
   * sets T/F value in corresponding user's info object in state */
  onUserToggle(e) {
    const { users } = this.state;
    const selectedUser = users.filter(user => user.id === +e.target.name);
    selectedUser[0].checked = e.target.checked;
    for (let user in users) {
      if (user.id === +e.target.name) {
        user = selectedUser
      }
    }
    this.setState({
      users
    });
  }

  render() {
    const { message, users } = this.state;
    return (
      <body>
        <div class="bars">
          <SideDashBoard />
          <AdminNavBar />
        </div>
        
        <div className="admin-dash-container">
        <form>
          <label className="message-input-label">
            Message
            <br/>
            <textarea
              className="message-input-box"
              type="text"
              value={message}
              onChange={this.onMessageChange}
            />
          </label>
            <div className="asm-user-row-heading">
              <input
                type="checkbox"
                className="asm-user-row-check hidden"
              />
              <p className='admin-dash-row-cell'>Username</p>
              <p className='admin-dash-row-cell'>First</p>
              <p className='admin-dash-row-cell'>Last</p>
              <p className='admin-dash-row-cell'>Phone</p>
              <p className='admin-dash-row-cell'>Action</p>
            </div>
          {users.map(user => {
            return (
              <div key={user.id} className="asm-user-row">
                <input
                  className="asm-user-row-check"
                  type="checkbox"
                  checked={user.checked}
                  onChange={this.onUserToggle}
                  name={user.id}
                />
                <p className='admin-dash-row-cell'>{user.username}</p>
                <p className='admin-dash-row-cell'>{user.first}</p>
                <p className='admin-dash-row-cell'>{user.last}</p>
                <p className='admin-dash-row-cell'>{user.phone}</p>
                <p className='admin-dash-row-cell'>{user.status}</p>
              </div>
            )
          })}
          </form>
        </div>
      </body>
    );
  }
}

export default AdminSendMsg;