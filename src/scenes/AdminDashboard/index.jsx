import React, { Component } from 'react';
import {
  withRouter
} from "react-router-dom";

import axios from 'axios';
import './styles.css';
import UserEntry from './components/UserEntry/index';
import NavBar from '../../components/Navbar/index';
import SideDashBoard from '../../components/AdminSideBar/index';

class UsersBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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

    axios.get('http://127.0.0.1:8000/api/user/', fetchOptions)
      .then(response => {
        for (let i = 0;i < response.data.length;i++) {
          this.state.data.push({
            username: response.data[i].username,
            name_first: response.data[i].first_name,
            name_last: response.data[i].last_name,
            email: response.data[i].email,
            phone: response.data[i].phone,
            last_login: response.data[i].updated_time,
            id: i + 1
          })
          // console.log(response.data[i])
        }
        // console.log(this.state.data)
        this.forceUpdate();
      });
  }

  changeQueryHandler = (event) => {
    this.setState({query: event.target.value});
  }

  filterData = () => {
    var filteredData = this.state.data.filter(person => (person.name_first).includes(this.state.query))
    this.setState({
      filtedData: filteredData,
      filtered: true,
    })
  }

  render(){
    var data = []
    if (this.state.filtered === false) {
      data = this.state.data
    } else {
      data = this.state.filteredData
    }

    return(
      <div>
        <div className="bars">
          <SideDashBoard id={1}/>
          <NavBar />
        </div>
        
        <div className = "dashboard">
          <div className = "top_content">
            <h1>Users</h1>
            <input type="text" className = "big_search" value={this.state.query} onChange={this.changeQueryHandler} placeholder = "Search"/>
            <div className = "container">
              <div id = "flex_container_two">
                <button id = "filter" type="button" onClick={this.filterData}>Filter</button>
              </div>
            </div>
          </div>
          <ul className = "flex_container_user_entries">
            <div id = "special_item_title">
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
      </div>
    )
  }
}

export default withRouter(UsersBody);
