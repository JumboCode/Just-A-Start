import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserActivityEntry from '../components/UserActivityEntry.jsx';
import AdminDashboardDropdown from '../components/AdminDashboardDropdown.jsx';
import AdminNavBar from '../components/AdminNavbar.jsx';
import SideDashBoard from '../components/SideDashBoard';

import './AdminDashboardBody.css';

class AdminDashboardBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          time: "10/09/2019",
          name: "Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 1
        },
        {
          time: "10/09/2019",
          name: "Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 2
        },
      ]
    }
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
          {data.map(item => (<UserActivityEntry data={item} key={item.id}/>))}
        </div>
      </body>
    )
  }
}

export default AdminDashboardBody;
