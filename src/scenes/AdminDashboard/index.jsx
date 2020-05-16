import React, { Component } from 'react';
import axios from 'axios';

import './styles.css';
import UserEntry from './components/UserEntry/index';
import AdminDashboardDropdown from './components/Dropdown/index';
import NavBar from '../../components/Navbar/index';
import SideDashBoard from '../../components/AdminSideBar/index';

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
    // axios.get('http://127.0.0.1:8000/api/alumni/get_example/')
    //     .then(response => {
    //       console.log(response)
    //     });
    const authToken = 0
    const fetchOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`,
      },
    }

    axios.get('http://127.0.0.1:8000/api/alumni/api/user/', fetchOptions)
        .then(response => {
          for (let i = 0;i < response.data.length;i++) {
            this.state.data.push({
              img_url: "../assets/profilepic.png",
              username: response.data[i].username,
              name_first: response.data[i].first_name,
              name_last: response.data[i].last_name,
              email: response.data[i].email,
              phone: response.data[i].phone,
              last_login: response.data[i].updated_time,
              id: i + 1
            })
            console.log(response.data[i])
          }
          console.log(this.state.data)
          this.forceUpdate();
        });
    
  }

  render(){
    const { data } = this.state;
    return(
      <body>
        <div class="bars">
          <SideDashBoard />
          <NavBar />
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
          {data.map(item => (<UserEntry data={item} key={item.id}/>))}
        </div>
      </body>
    )
  }
}

export default UsersBody;
