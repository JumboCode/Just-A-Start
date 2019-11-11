import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserActivityEntry from './UserActivityEntry.jsx';
import AdminDashboardDropdown from '../components/AdminDashboardDropdown.jsx'

import './AdminDashboardBody.css';

class AdminDashboardBody extends React.Component {
  render(){
    return(
      <body>
        <div class = "dashboard">
          <div class = "top_content">
            <h1>Activity Log</h1>
            <input type="text" class = "big_search" />
            <div class = "container">
              <div id = "flex_container_two">
                <AdminDashboardDropdown name = "All Dates"/>
                <AdminDashboardDropdown name = "All Authors"/>
                <button id = "filter" type="button">Filter</button>
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
            <li>Date</li>
            <li>Author</li>
            <li>Action</li>
            <li>Description</li>
          </ul>
          <UserActivityEntry />
          <UserActivityEntry />
          <UserActivityEntry />
          <UserActivityEntry />
          <UserActivityEntry />
          <UserActivityEntry />
        </div>
      </body>
    )
  }
}

export default AdminDashboardBody;
