import React, { Component } from 'react';
import './adminSendMsgStyles.css';

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
      <div>
        <h1>Notifications</h1>
        <form>
          <label>
            Message
            <textarea
              type='text'
              value={message}
              onChange={this.onMessageChange}
            />
          </label>
        {users.map(user => {
          return (
            <div key={user.id} className="asm-user-row">
              <input
                type="checkbox"
                checked={user.checked}
                onChange={this.onUserToggle}
                name={user.id}
              />
              <p>{user.username}</p>
              <p>{user.first}</p>
              <p>{user.last}</p>
              <p>{user.phone}</p>
              <p>{user.status}</p>
            </div>
          )
        })}
        </form>
      </div>
    );
  }
}

export default AdminSendMsg;