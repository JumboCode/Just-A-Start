import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './AdminUserList.css';
import UsersEntry from '../components/UsersEntry.jsx';
import AdminDashboardDropdown from '../components/AdminDashboardDropdown.jsx'
import AdminNavBar from '../components/AdminNavbar.jsx';
import SideDashBoard from '../components/SideDashBoard';

class UsersBody extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          img_url: "../assets/profilepic.png",
          username: "kbrown01",
          name_first: 'Kate',
          name_last: 'Brown',
          email: "katebrown@gmail.com",
          phone: "+1(617)-283-1837",
          last_login: "1 hour ago",
          id: 1
        },
      ]
    }
    
    
    this.state = {
      data: [
      ]
    }
    
  }

  componentDidMount() {

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Token 81628b1e856f5d822053571e024571a888e8139e',
      }
    }

    fetch('http://127.0.0.1:8000/api/user/', options)
      .then(res => res.json())
      .then(res => {
        var count = 1;
        for (let user of res) {
          this.state.data.push({
            img_url: "../assets/profilepic.png",
            username: user.username,
            name_first: user.first_name,
            name_last: user.last_name,
            email: user.email,
            phone: user.phone,
            last_login: "some date",
            profile: `admin-userview/?email=${user.email}`,
            id: count
          })
          console.log(user);
          count += 1
        }
        this.forceUpdate();
      })
    
  }

  render(){
    const { data } = this.state;
    return(
      <body>
        <div class="bars">
          <SideDashBoard />
          <AdminNavBar />
        </div>
        
        <div class = "dashboard">
          <div class = "top_content">
            <h1>Users</h1>
            <input type="text" class = "big_search" placholder = "Search"/>
            <div class = "container">
              <div id = "flex_container_two">
                <AdminDashboardDropdown name = "All Users"/>
                <button id = "filter" type="button">Filter</button>
                <button id = "filter" type="button">Add User</button>
              </div>
              <div id = "flex_container_three">
                <button class = "arrow" id = "left" type="button"> ></button>
                <input type="text" class = "page_search" />
                <p id="page_text"> of 5</p>
                <button class = "arrow" type="button"> ></button>
              </div>
            </div>
          </div>
          <ul class = "flex_container_user_entries">
            <div id = "special_item_title" class>
            </div>
            <li id="item_title">Username</li>
            <li id="item_title">First</li>
            <li id="item_title">Last</li>
            <li id="item_title">Email</li>
            <li id="item_title">Phone</li>
            <li id="item_title">Last Login</li>
          </ul>
          {data.map(item => (<UsersEntry data={item} key={item.id}/>))}
        </div>
      </body>
    )
  }
}

export default UsersBody;
