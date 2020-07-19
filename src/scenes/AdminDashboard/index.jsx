import React, { Component } from 'react';
import {
  withRouter
} from "react-router-dom";

import './styles.css';
import UserEntry from './components/UserEntry/index';
import NavBar from '../../components/Navbar/index';
import SideDashBoard from '../../components/AdminSideBar/index';

class UsersBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    fetch('http://127.0.0.1:8000/admin_user/', fetchOptions)
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
      });
    
    fetch('http://127.0.0.1:8000/admin_alumnus/', fetchOptions)
      .then(res => res.json())
      .then(res => {
        var users = this.state.userData
        var tempUsers = []
        
        for (var i = 0; i < users.length; i++) {
          let temp = {}
          temp['username'] = users[i]['username']
          temp['first_name'] = users[i]['first_name']
          temp['last_name'] = users[i]['last_name']
          temp['email'] = users[i]['email']
          temp['phone_number'] = res['results'][i]['phone_number']
          temp['date_of_birth'] = res['results'][i]['date_of_birth']
          temp['email'] = users[i]['email']
          temp['id'] = res['results'][i]['id']
          tempUsers.push(temp)
        }

        this.setState({
          userData: tempUsers
        })
      });
  }

  changeQueryHandler = (event) => {
    this.setState({query: event.target.value});
  }

  filterData = () => {
    var filteredData = this.state.userData.filter(person => (person.name_first).includes(this.state.query))
    this.setState({
      filtedData: filteredData,
      filtered: true,
    })
  }

  render(){
    var data = []
    if (this.state.filtered === false) {
      data = this.state.userData
    } else {
      data = this.state.filteredData
    }

    return(
      <div>
        <div className="bars">
          <SideDashBoard id={1}/>
          <NavBar name={"Naoki Okada"} type="Admin" key={this.props.authToken}/>
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
