import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UsersBody.css';
import UsersEntry from './UsersEntry.jsx';
import AdminDashboardDropdown from '../components/AdminDashboardDropdown.jsx'

class UsersBody extends React.Component {
  render(){
    return(
      <body>
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
          <ul class = "flex_container">
            <li>Username</li>
            <li>First</li>
            <li>Last</li>
            <li>Email/Phone</li>
            <li id = "last_item">Last Login</li>
          </ul>
          <UsersEntry />
          <UsersEntry />
          <UsersEntry />
          <UsersEntry />
          <UsersEntry />
        </div>
      </body>
    )
  }
}

export default UsersBody;
