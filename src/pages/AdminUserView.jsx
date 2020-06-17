import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';
import JobEntry from '../components/JobEntry.jsx';
import AdminNavbar from '../components/AdminNavbar.jsx';
import ProfileEdit from '../components/ProfileEdit.jsx';

const queryString = require('query-string');

class AdminUserView extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.profileEditElement = React.createRef();
    this.state = {
      profile_edit: "false",
      visibilityOne: false,
      visibilityTwo: false,
      visibilityThree: false,
      vis: [false, false, false],
      Education: [new Array(5)],
      Program: [new Array(5)],
      Unemployed: [new Array(2)],
      
      confirmedEducation: [new Array(5)],
      confirmedProgram: [new Array(5)],
      confirmedUnemployed: [new Array(2)],
      
      editEducation: [false],
      editProgram: [false],
      editUnemployed: [false],
      fieldsOne: [
        {
          'name': 'Name of School/Company',
          'type': 'text',
          'id':0
        },
        {
          'name': 'Type of Degree/Certificate',
          'type': 'text',
          'id':1
        },
        {
          'name': 'Type of Institution',
          'type': 'text',
          'id':2
        },
        {
          'name': 'Program/Major',
          'type': 'text',
          'id':3
        },
        {
          'name': 'Start Date',
          'type': 'date',
          'id':4
        }
      ],
      fieldsTwo: [
        {
          'name': 'Name of Employer',
          'type': 'text',
          'id':0
        },
        {
          'name': 'Job Title',
          'type': 'text',
          'id':1
        },
        {
          'name': 'Hourly Pay',
          'type': 'text',
          'id':2
        },
        {
          'name': '# of Hours per Week',
          'type': 'text',
          'id':3
        },
        {
          'name': 'Start Date',
          'type': 'date',
          'id':4
        }
      ],
      fieldsThree: [
        {
          'name': 'Desired Job',
          'type': 'text',
          'id':0
        },
        {
          'name': 'Degree Level',
          'type': 'text',
          'id':1
        }
      ],
      job_data: [
        {
          job_title: "Job Title",
          company: "Company",
          city: "City",
          job_length: "2015 - Present",
          hours_per_week: 38,
          salary: 96000,
          description: [{
                          id: 1,
                          text: "Determines operational feasability by evaluating analysis, problem definition, requirements, solution development, and proposed solutions"
                        },
                        {
                          id: 2,
                          text: "Documents and demonstrates solutions by devloping documentation, flowcharts, layouts, diagrams, charts, code comments and clear code."
                        },
                        {
                          id: 3,
                          text: "Prepares and installs solutions by determining and designing system specifications, standards, and programming."
                        }],
          id: 1
        }
      ],
      
      profile_data: {
        name: "Jackson Smith",
        class: "... of 2008",
        location: "Boston, MA",
        about: "I am a software engineer",
        phone: "+(617)-565-1234",
        email: "Jacksonsmith@gmail.com",
        birthdate: props.birthdate
      }

    }

    this.getData(queryString.parse(props.location.search).email)
  }

  getData = (email) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Token 81628b1e856f5d822053571e024571a888e8139e`,
      }
    }

    fetch(`http://127.0.0.1:8000/api/user/get_user_by_email/?email=${email}`, options)
      .then(res => res.json())
      .then(res => {
        var data = res[0].fields;
        console.log(data);
        this.setState({
          profile_data: {
            name: data.first_name + " " + data.last_name,
            class: "... of 2008",
            location: "N/A",
            about: "About Section",
            phone: data.phone,
            email: data.email,
            birthdate: data.date_of_birth
          }
        })
      }).catch(err => {
        console.log(err);
      });
  }

  profileEditClicked = () => {
      //this.setState({ profile_edit: "true" });
      this.profileEditElement.current.changeVisibilityOn(this.state.profile_data.name, this.state.profile_data.birthdate, this.state.profile_data.location, this.state.profile_data.phone, this.state.profile_data.email, this.state.profile_data.about);
  };
  handler(name, dob, location, phone, email, about){
    console.log(this.state.profile_data.name);
    this.state.profile_data.name = name;
    this.state.profile_data.location = location;
    this.state.profile_data.about = about;
    this.state.profile_data.phone = phone;
    this.state.profile_data.email = email;
    this.state.profile_data.birthdate = dob;
    this.forceUpdate();
  }
  
  changeVisiblityOne = () => {
      for(let x = 0; x < this.state.editEducation.length; x++){
        this.state.editEducation[x] = false;
      }
      this.state.vis[0] = ! this.state.vis[0];
      this.forceUpdate();
  }
  
  changeVisiblityTwo = () => {
      for(let x = 0; x < this.state.editProgram.length; x++){
        this.state.editProgram[x] = false;
      }
      this.state.vis[1] = ! this.state.vis[1];
      this.forceUpdate();
  }
  
  changeVisiblityThree = () => {
      for(let x = 0; x < this.state.editUnemployed.length; x++){
        this.state.editUnemployed[x] = false;
      }
      this.state.vis[2] = ! this.state.vis[2];
      this.forceUpdate();
  }

  render(){
    const background = {
      //"background-color":'EEF6FE'
      width: "100%",
      height: 2000,
      backgroundColor: "#eef6fe",
      position: "absolute"
    }

    //const { profile_data } = this.state;

    return(
      <body>
        <AdminNavbar/>
        <div style = {background}>
          <ProfileEdit handler = {this.handler} ref={this.profileEditElement}/>
          <div id="allthestuff">
            <div className = "profile">
              <div className = "top_text">
                <h1 className = "title">Profile</h1>
                <button onClick={this.profileEditClicked} className = "add" id = "edit">&#9998;</button>
              </div>
              <h1 className = "centered">{this.state.profile_data.name}</h1>
              <p className = "centered" id = "small">{this.state.profile_data.class}</p>
              <p className = "centered" id = "medium">{this.state.profile_data.location}</p>
              <div className = "flex_container_two">
                <p className = "left_text_profile">About</p>
                <p className = "right_text_profile">{this.state.profile_data.about}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Phone</p>
                <p className = "right_text_profile">{this.state.profile_data.phone}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Email</p>
                <p className = "right_text_profile">{this.state.profile_data.email}</p>
              </div>
              <div className = "flex_container_two">
                <p className = "left_text_profile">Date Of Birth</p>
                <p className = "right_text_profile">{this.state.profile_data.birthdate}</p>
              </div>
            </div>
            <div className = "job_list">
              <div className = "top_text">
                <h1 className = "title">Job Experience</h1>
                <button className = "add">+</button>
              </div>
              
            <div className = "edit-experiences">
              <div className = "experience-titles">
                  <label id="plus-button" onClick={this.changeVisiblityOne}>+</label>
                  <p class="experience-titles-text">Education/Training Post-Program Placement</p>
              </div>
              <div className = "flexbox-user-dashboard-big">
                {this.state.vis[0] && this.state.Education.map((element, index) => <div id={"education" + index.toString()}>
                                                                                  {this.state.fieldsOne.map(item => <div >
                                                                                                                      <p id="experience-edit-field">{item.name}</p>
                                                                                                                      <input disabled = "disabled" value={this.state.confirmedEducation[index][item.id]} onChange={(e) => this.handleEducationChange(index, item.id, e)} class="input-experience-edit" type={item.type}></input>
                                                                                                                    </div>)}
                                                                                  <div class="edit-experiences-button-div">
                                                                                    {!this.state.editEducation[index] && <button class="edit-experiences-button" onClick ={() => this.editEducation(index)}>Edit</button>}
                                                                                    {this.state.editEducation[index] && <button class="edit-experiences-button" onClick ={() => this.confirmEducation(index)}>Confirm</button>}
                                                                                    <button class="edit-experiences-button" onClick ={() => this.deleteEducation(index)}>Delete</button>
                                                                                  </div>
                                                                                  </div>)}
              </div>
              {this.state.vis[0] && <button onClick={this.addEducation.bind(this)} class="edit-experiences-button" id = "add-button-experiences">&#9998; Add</button>}
            </div>
            
            <div className = "edit-experiences">
              <div className = "experience-titles">
                  <label id="plus-button" onClick={this.changeVisiblityTwo}>+</label>
                  <p class="experience-titles-text">Employment Post-Program Placement</p>
              </div>
              <div className = "flexbox-user-dashboard-big">
                {this.state.vis[1] && this.state.Program.map((element, index) => <div id={"program" + index.toString()}>
                                                                                  {this.state.fieldsTwo.map(item => <div >
                                                                                                                      <p id="experience-edit-field">{item.name}</p>
                                                                                                                      <input disabled = "disabled" value={this.state.confirmedProgram[index][item.id]} onChange={(e) => this.handleProgramChange(index, item.id, e)} class="input-experience-edit" type={item.type}></input>
                                                                                                                    </div>)}
                                                                                  <div class="edit-experiences-button-div">
                                                                                    {!this.state.editProgram[index] && <button class="edit-experiences-button" onClick ={() => this.editProgram(index)}>Edit</button>}
                                                                                    {this.state.editProgram[index] && <button class="edit-experiences-button" onClick ={() => this.confirmProgram(index)}>Confirm</button>}
                                                                                    <button class="edit-experiences-button" onClick ={() => this.deleteProgram(index)}>Delete</button>
                                                                                  </div>
                                                                                  </div>)}
              </div>
              {this.state.vis[1] && <button onClick={this.addProgram.bind(this)} class="edit-experiences-button" id = "add-button-experiences">&#9998; Add</button>}
            </div>
            
            <div className = "edit-experiences">
              <div className = "experience-titles">
                  <label id="plus-button" onClick={this.changeVisiblityThree}>+</label>
                  <p class="experience-titles-text">Unemployed</p>
              </div>
              <div className = "flexbox-user-dashboard-big">
                  {this.state.vis[2] && this.state.Unemployed.map((element, index) => <div id={"unemployed" + index.toString()}>
                                                                                    {this.state.fieldsThree.map(item => <div >
                                                                                                                        <p id="experience-edit-field">{item.name}</p>
                                                                                                                        <input disabled = "disabled" value={this.state.confirmedUnemployed[index][item.id]} onChange={(e) => this.handleUnemployedChange(index, item.id, e)} class="input-experience-edit" type={item.type}></input>
                                                                                                                      </div>)}
                                                                                    <div class="edit-experiences-button-div">
                                                                                      {!this.state.editUnemployed[index] && <button class="edit-experiences-button" onClick ={() => this.editUnemployed(index)}>Edit</button>}
                                                                                      {this.state.editUnemployed[index] && <button class="edit-experiences-button" onClick ={() => this.confirmUnemployed(index)}>Confirm</button>}
                                                                                      <button class="edit-experiences-button" onClick ={() => this.deleteUnemployed(index)}>Delete</button>
                                                                                    </div>
                                                                                    </div>)}
                </div>
                {this.state.vis[2] && <button onClick={this.addUnemployed.bind(this)} class="edit-experiences-button" id = "add-button-experiences">&#9998; Add</button>}
              </div>
            </div>
          </div>

        </div>
      </body>
    )
  }
}

export default AdminUserView;
