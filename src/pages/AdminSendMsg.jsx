import React, { Component } from 'react';
import './AdminSendMsg.css';
import AdminNavBar from '../components/AdminNavbar.jsx';
import SideDashBoard from '../components/SideDashBoard';

class AdminSendMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regexp: RegExp(''),
      displayPopUp: false,
      users: [
        {
          name: "aJohn Smith",
          checked: false
        },
        {
          name: "bJohn Smith",
          checked: false
        },
        {
          name: "cJohn Smith",
          checked: false
        },
        {
          name: "dJohn Smith",
          checked: false
        },
        {
          name: "eJohn Smith",
          checked: false
        },
        {
          name: "fJohn Smith",
          checked: false
        },
        {
          name: "gJohn Smith",
          checked: false
        },
        {
          name: "aJohn Smith",
          checked: false
        },
        {
          name: "bJohn Smith",
          checked: false
        },
        {
          name: "cJohn Smith",
          checked: false
        },
        {
          name: "dJohn Smith",
          checked: false
        },
        {
          name: "eJohn Smith",
          checked: false
        },
        {
          name: "fJohn Smith",
          checked: false
        },
        {
          name: "gJohn Smith",
          checked: false
        }
        
      ],
      selectedUsers: ["hello"],
      message: ''
    };
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  componentDidMount() {
  }


  onMessageChange(e) {
    this.setState({
      message: e.target.value,
    })
  }

  handleInputChange = (event) => {
    this.setState({
      regexp: RegExp(event.target.value.toUpperCase())
    })
  }

  handleCheck(num){
    var a = document.getElementById("checkbox"+num.toString())
    if(this.state.users[num].checked){
      for(let x = 0; x < a.length; x++){
        a[0].removeAttribute("checked", "checked");
      }
    }else{
      for(let x = 0; x < a.length; x++){
        a[x].setAttribute("checked", "checked");
      }
    }
    this.checkStateChange(num);
  }

  checkStateChange(num){
    console.log("CHANGING")
    this.setState(state => {
      const list = state.users.map((item, j) => {
        if (j === num) {
          var user = item;
          user.checked = !user.checked
          return user;
        } else {
          return item;
        }
      });
      return {
        list,
      };
    });
  }
  togglePopup = () => {
    console.log("HI")
    this.setState({
      displayPopUp: !this.state.displayPopUp
    })
  }

  render() {
    return (
      <body>
        <div class="bars">
          <SideDashBoard />
          <AdminNavBar />
        </div>
        {this.state.displayPopUp && <div class = "check-users-popup">
          <div class="close-check-popup-div">
            <button onClick={this.togglePopup} class="close-check-popup">&#10005;</button>
          </div>
          <div>
            <p class="check-users-title">Selected Recipient(s)</p>
            <input onChange={this.handleInputChange} class="check-users-input"></input>
            <div class = "check-users-list" >
              {this.state.users.map((e, index) => (this.state.regexp == null || this.state.regexp.test(e.name.toUpperCase())) && <div class="check-users-user-div">
                                                                        <input onChange={() => this.handleCheck(index)} defaultChecked={e.checked} id={"checkbox"+index.toString()} type="checkbox" />
                                                                        <p class="check-users-name">{e.name}</p>
                                                                      </div>)}
            </div>
          </div>
        </div>}
        <div className="admin-dash-container">
          <form>
            <h1>Notification</h1>
            <h4>Recipients</h4>
            <div className = "side-by-side">
              <div class="div-of-chosen-users">
                {this.state.users.map((e, index) => e.checked && <div class="selected-user">
                                                <p>{e.name}</p>
                                                <input type="button" onClick={() => this.checkStateChange(index)} value = "&#10005;"class="delete-selected-user"></input>
                                              </div>)}
              </div>
              <div class ="toggle-popup">
                <button type="button" onClick={this.togglePopup} className="plus-button">+</button>
              </div>
              
            </div>
            <h4>Message</h4>
            <textarea className="text-area" placeholder="Type a message"></textarea>
            <button type="button" className="send-button">Send</button>
          </form>
        </div>
      </body>
    );
  }
}

export default AdminSendMsg;