import React, { Component } from 'react';
import {
  withRouter
} from "react-router-dom";

import NavBar from '../../components/Navbar/index';
import AdminSideBar from '../../components/AdminSideBar/index';
import './styles.css';

class AdminSendMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regexp: RegExp(''),
      displayPopUp: false,
      users: [],
      message: ''
    };
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  componentDidMount() {
    const authToken = this.props.authToken
    const fetchOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`,
      },
    }

    fetch('http://127.0.0.1:8000/users/', fetchOptions)
    .then(res => res.json())
    .then(res => {
      this.setState({
        first_name: res['results'][0]['first_name'],
        last_name: res['results'][0]['last_name'],
      })
    })

    fetch('http://127.0.0.1:8000/admin_user/', fetchOptions)
      .then(res => res.json())
      .then(res => {
        var item
        var usersTemp = []
        var userData = res['results']
        
        for (item of userData) {
          if (item.is_staff === false) {
            var user = {}
            user['name'] = item['first_name'] + " " + item['last_name']
            user['email'] = item['email']
            usersTemp.push(user)
          }  
        }

        this.setState({
          users: usersTemp,
        })
      });
    
    console.log(this.state.users)
    
    fetch('http://127.0.0.1:8000/admin_alumnus/', fetchOptions)
      .then(res => res.json())
      .then(res => {
        var users = this.state.users
        var tempUsers = []
        var length = users.length
        console.log(length)
        
        for (var i = 0; i < length; i++) {
          console.log(res['results'][i])
          let temp = {}
          temp['name'] = users[i]['name']
          temp['email'] = users[i]['email']
          temp['phone_number'] = res['results'][i]['phone_number']
          temp['date_of_birth'] = res['results'][i]['date_of_birth']
          temp['email'] = users[i]['email']
          temp['id'] = users[i]['id']
          tempUsers.push(temp)
        }

        this.setState({
          users: tempUsers
        })
      });
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
    this.setState({
      displayPopUp: !this.state.displayPopUp
    })
  }

  sendMessage = e => {
    e.preventDefault();
    var phoneNumbers = []
    this.state.users.map((item, j) => {
      if (item.checked) {
        phoneNumbers = [...phoneNumbers, item.phone_number];
      } 
      return 1
    });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.authToken}`,
      },
      body: JSON.stringify({"numbers": phoneNumbers, "message": this.state.message}),
      // body: {"numbers": phoneNumbers, "message": this.state.message}
    };

    console.log(requestOptions)
    
    fetch('http://127.0.0.1:8000/messaging/send_text/', requestOptions)
      .catch(err => {
        console.log("FAIL " + err);
      });
  }

  render() {
    var full_name = this.state.first_name + " " + this.state.last_name

    return (
      <div>
        <div className="bars">
          <AdminSideBar id={2}/>
          <NavBar name={full_name} type="Admin" key={this.props.authToken}/>
        </div>
        {this.state.displayPopUp && 
          <div className = "check-users-popup">
            <div className="close-check-popup-div">
              <button onClick={this.togglePopup} className="close-check-popup">&#10005;</button>
            </div>
            <div>
              <p className="check-users-title">Selected Recipient(s)</p>
              <input onChange={this.handleInputChange} className="check-users-input"></input>
              <div className="check-users-list" >
                {this.state.users.map((e, index) => (this.state.regexp == null || this.state.regexp.test(e.name.toUpperCase())) && 
                  <div className="check-users-user-div" key={e.id}>
                    <input onChange={() => this.handleCheck(index)} defaultChecked={e.checked} id={"checkbox"+index.toString()} type="checkbox" />
                    <p className="check-users-name">{e.name}</p>
                  </div>)}
              </div>
            </div>
          </div>}
        <div className="admin-dash-container">
          <form>
            <h1>Notification</h1>
            <h4>Recipients</h4>
            <div className = "side-by-side">
              <div className="div-of-chosen-users">
                {this.state.users.map((e, index) => e.checked && <div className="selected-user">
                                                <p>{e.name}</p>
                                                <input type="button" onClick={() => this.checkStateChange(index)} value = "&#10005;"className="delete-selected-user"></input>
                                              </div>)}
              </div>
              <div className="toggle-popup">
                <button type="button" onClick={this.togglePopup} className="plus-button">+</button>
              </div>   
            </div>
          </form>
            
          <form onSubmit={this.sendMessage}>
            <h4>Message</h4>
            <textarea onChange={this.onMessageChange} className="text-area" placeholder="Type a message" />
            <input className="send-button" type="submit" value="Send"/>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminSendMsg);