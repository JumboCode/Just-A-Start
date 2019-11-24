import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserActivityEntry from './UserActivityEntry.jsx';
import AdminDashboardDropdown from '../components/AdminDashboardDropdown.jsx'

import './AdminDashboardBody.css';

class AdminDashboardBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          time: "10/09/2019",
          name: "1Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 1
        },
        {
          time: "10/09/2019",
          name: "2Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 2
        },
        {
          time: "10/09/2019",
          name: "3Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 3
        },
        {
          time: "10/09/2019",
          name: "4Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 4
        },
        {
          time: "10/09/2019",
          name: "5Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 5
        },
        {
          time: "10/09/2019",
          name: "6Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 6
        },
        {
          time: "10/09/2019",
          name: "7Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 7
        },
        {
          time: "10/09/2019",
          name: "8Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 8
        },
        {
          time: "10/09/2019",
          name: "9Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 9
        },
        {
          time: "10/09/2019",
          name: "10Kate Brown",
          change_type: "Update",
          change_desc: "changed a profile photo",
          user_type: "user",
          id: 10,
        }
      ],
      entriesPerPage: 3,
      pageNumber: 1,
      numbers: [...Array(10).keys()],
      pages:[...Array(10).keys()].slice(0,3)
    }
  }
  IncrementItem = () => {
      if((1+parseInt((this.state.data.length-1)/this.state.entriesPerPage))>this.state.pageNumber){
        this.setState({ pageNumber: this.state.pageNumber + 1 });
        this.setState({userPageNumber: this.state.pageNumber+1})
        this.setState({ pages: this.state.numbers.slice(this.state.entriesPerPage*(this.state.pageNumber),this.state.entriesPerPage*(this.state.pageNumber+1))});
      }
  }
  DecrementItem = () => {
      if(1<this.state.pageNumber){
        this.setState({ pageNumber: this.state.pageNumber - 1 });
        this.setState({userPageNumber: this.state.pageNumber-1})
        this.setState({ pages: this.state.numbers.slice(this.state.entriesPerPage*(this.state.pageNumber-2),this.state.entriesPerPage*(this.state.pageNumber-1))});
      }
  }

  handleInputChange = (event) => {
    if (event.keyCode == 13){
      this.setState({userPageNumber: event.target.value})
      if((1+parseInt((this.state.data.length-1)/this.state.entriesPerPage)) >= this.state.userPageNumber){
        console.log("hi")
        if(this.state.userPageNumber > 0){
          this.setState({pageNumber:this.state.userPageNumber})
          this.setState({ pages: this.state.numbers.slice(this.state.entriesPerPage*(this.state.userPageNumber-1),this.state.entriesPerPage*(this.state.userPageNumber))})
        }else{
          this.setState({userPageNumber:1})
          this.setState({pageNumber:1})
          this.setState({ pages: this.state.numbers.slice(0,this.state.entriesPerPage)})
        }
      }else{
        this.setState({userPageNumber:this.state.pageNumber})
        console.log(this.state.userPageNumber)
      }
    }
  }
  handleChange = (event) => {
    this.setState({userPageNumber: event.target.value})
  }

  render(){
    const { data } = this.state;
    const { pages } = this.state;

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
                <button onClick={this.DecrementItem}class = "arrow" id = "left" type="button"> ></button>
                <input type="text" value={this.state.userPageNumber} onChange={this.handleChange} onKeyUp={this.handleInputChange} class = "page_search" placeholder={this.state.pageNumber}/>
                <p id="page_text"> of {1+parseInt((this.state.data.length-1)/this.state.entriesPerPage)}</p>
                <button onClick={this.IncrementItem} class = "arrow" type="button"> ></button>
              </div>
            </div>
          </div>
          <ul class = "flex_container_admin">
            <li>Date</li>
            <li>Author</li>
            <li>Action</li>
            <li>Description</li>
          </ul>
          {pages.map( item => (<UserActivityEntry data={data[item]} key={item.id}/>))}
        </div>
        <p>{this.state.userPageNumber}</p>
      </body>
    )
  }
}

export default AdminDashboardBody;
