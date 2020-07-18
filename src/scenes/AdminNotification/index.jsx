import React, { Component } from 'react';
import {
  withRouter
} from "react-router-dom";

import axios from 'axios';
import NavBar from '../../components/Navbar/index';
import SideDashBoard from '../../components/AdminSideBar/index';
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

    axios.get('http://127.0.0.1:8000/api/user/', fetchOptions)
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.state.users.push({
            username: response.data[i].username,
            name: response.data[i].first_name + " " + response.data[i].last_name,
            phone: response.data[i].phone,
            id: i + 1,
            checked: false
          })
          console.log(response.data[i])
        }
        console.log(this.state.data)
        this.forceUpdate();
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
        phoneNumbers = [...phoneNumbers, item.phone];
      } 
      return 1
    });
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ "numbers":phoneNumbers,"message":this.state.message })
    };
    
    /*fetch('http://127.0.0.1:8000/api/user/send_text/', requestOptions)
        .then(response => console.log(response.json()))
        .then(data => console.log(data));*/

    console.log(requestOptions)
    console.log(phoneNumbers)
  }

  render() {
    return (
      <div>
        <div className="bars">
          <SideDashBoard id={2}/>
          <NavBar type="Admin" key={this.props.authToken}/>
        </div>
        {this.state.displayPopUp && <div class = "check-users-popup">
          <div className="close-check-popup-div">
            <button onClick={this.togglePopup} class="close-check-popup">&#10005;</button>
          </div>
          <div>
            <p className="check-users-title">Selected Recipient(s)</p>
            <input onChange={this.handleInputChange} class="check-users-input"></input>
            <div className="check-users-list" >
              {this.state.users.map((e, index) => (this.state.regexp == null || this.state.regexp.test(e.name.toUpperCase())) && <div className="check-users-user-div">
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
                {this.state.users.map((e, index) => e.checked && <div class="selected-user">
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