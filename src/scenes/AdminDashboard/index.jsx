import React, { Component } from 'react';
import {
  withRouter
} from "react-router-dom";

import './styles.css';
import UserEntry from './components/UserEntry/index';
import NavBar from '../../components/Navbar/index';
import AdminSideBar from '../../components/AdminSideBar/index';
import { config } from '../../Constants'

class UsersBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regexp: RegExp(''),
      first_name: "",
      last_name: "",
      userData: [],
      filteredData: [],
      filtered: false,
      query: ""
    }
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

    fetch(`${config.url.API_URL}/api/users/`, fetchOptions)
      .then(res => res.json())
      .then(res => {
        this.setState({
          first_name: res['results'][0]['first_name'],
          last_name: res['results'][0]['last_name'],
        })
      })
      .catch(err => {
        console.log("FAIL " + err);
      });

    fetch(`${config.url.API_URL}/api/admin_user/`, fetchOptions)
      .then(res => res.json())
      .then(res => {
        var item
        var usersTemp = []
        var userData = res['results']
        
        for (item of userData) {
          if (item.is_staff === false) {
            usersTemp.push(item)
          }  
        }

        this.setState({
          userData: usersTemp,
        })
      })
      .catch(err => {
        console.log("FAIL " + err);
      });
    
    fetch(`${config.url.API_URL}/api/admin_alumnus/`, fetchOptions)
      .then(res => res.json())
      .then(res => {
        var users = this.state.userData
        var tempUsers = []
        
        for (var i = 0; i < users.length; i++) {
          let temp = {}
          temp['username'] = users[i]['username']
          temp['name'] = users[i]['first_name'] + " " + users[i]['last_name']
          temp['first_name'] = users[i]['first_name']
          temp['last_name'] = users[i]['last_name']
          temp['email'] = users[i]['email']
          temp['phone_number'] = res['results'][i]['phone_number']
          temp['date_of_birth'] = res['results'][i]['date_of_birth']
          temp['email'] = users[i]['email']
          temp['id'] = users[i]['id']
          tempUsers.push(temp)
        }

        this.setState({
          userData: tempUsers
        })
      })
      .catch(err => {
        console.log("FAIL " + err);
      });
  }

  changeQueryHandler = (event) => {
    this.setState({
      query: event.target.value,
      regexp: RegExp(event.target.value.toUpperCase())
    })
  }

  filterData = () => {
    var filteredData = this.state.userData.filter((e, index) => (this.state.regexp == null || this.state.regexp.test(e.name.toUpperCase())))
    this.setState({
      filteredData: filteredData,
      filtered: true,
    })
  }

  render(){
    var data
    if (this.state.filtered === false) {
      data = this.state.userData
    } else {
      data = this.state.filteredData
    }
    
    var full_name = this.state.first_name + " " + this.state.last_name

    return(
      <div>
        <div className="bars">
          <AdminSideBar id={1}/>
          <NavBar name={full_name} type="Admin" key={this.props.authToken}/>
        </div>
        
        <div className = "dashboard">
          <div className = "top_content">
            <h1>Users</h1>
            <input type="text" className="big_search" value={this.state.query} onChange={this.changeQueryHandler} placeholder = "Search"/>
            <div className = "container">
              <div id="flex_container_two">
                <button id="filter" type="button" onClick={this.filterData}>Filter</button>
              </div>
            </div>
          </div>
          <ul className = "flex_container_user_entries">
            <li id="item_title">Username</li>
            <li id="item_title">First</li>
            <li id="item_title">Last</li>
            <li id="item_title">Email</li>
            <li id="item_title">Phone</li>
          </ul>
          {data.map((item) => <UserEntry data={item} key={item['id']}/>)}
        </div>
      </div>
    )
  }
}

export default withRouter(UsersBody);
