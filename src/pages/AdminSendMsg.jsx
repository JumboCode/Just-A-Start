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
          <h1>Notification</h1>
          <h4>Recipients</h4>
          <input type="text" className="search-bar" placeholder="Search.." name="search"></input>
          <h4>Message</h4>
          <textarea className="text-area" placeholder="Type a message"></textarea>
          <button type="button" className="button">Send</button>
          </form>
        </div>
      </body>
    );
  }
}

export default AdminSendMsg;