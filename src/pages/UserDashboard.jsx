import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';
import JobEntry from '../components/JobEntry.jsx';
import AdminNavbar from '../components/AdminNavbar.jsx';
import ProfileEdit from '../components/ProfileEdit.jsx';

class UserDashboard extends React.Component {
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
      educations: [new Array(5)],
      programs: [new Array(5)],
      unemployed: [new Array(2)],
      userInputData : new Array(13),
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
          'id':5
        },
        {
          'name': 'Job Title',
          'type': 'text',
          'id':6
        },
        {
          'name': 'Hourly Pay',
          'type': 'text',
          'id':7
        },
        {
          'name': '# of Hours per Week',
          'type': 'text',
          'id':8
        },
        {
          'name': 'Start Date',
          'type': 'date',
          'id':9
        }
      ],
      fieldsThree: [
        {
          'name': 'Desired Job',
          'type': 'text',
          'id':10
        },
        {
          'name': 'Degree Level',
          'type': 'text',
          'id':11
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
        birthdate: "01/12/1991"
      }

    }
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
      this.state.vis[0] = ! this.state.vis[0];
      this.forceUpdate();
  }
  
  changeVisiblityTwo = () => {
      this.state.vis[1] = ! this.state.vis[1];
      this.forceUpdate();
  }
  
  changeVisiblityThree = () => {
      this.state.vis[2] = ! this.state.vis[2];
      this.forceUpdate();
  }
  addEducation = () => {
    this.state.educations.push(new Array(5));
    this.forceUpdate();
  }
  addProgram = () => {
    this.state.programs.push(new Array(5));
    this.forceUpdate();
  }
  addUnemployed = () => {
    this.state.unemployed.push(new Array(2));
    this.forceUpdate();
  }
  handleEducationChange(educationNumber, id, e){
      this.state.educations[educationNumber][id] = e.target.value;
      this.forceUpdate();
  }
  handleProgramChange(educationNumber, id, e){
      this.state.programs[educationNumber][id] = e.target.value;
      this.forceUpdate();
  }
  handleUnemployedChange(educationNumber, id, e){
      this.state.unemployed[educationNumber][id] = e.target.value;
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
                {this.state.vis[0] && this.state.educations.map((element, index) => this.state.fieldsOne.map(item => <div><p id="experience-edit-field">{item.name}</p><input value={this.state.educations[index][item.id]} onChange={(e) => this.handleEducationChange(index, item.id, e)} class="input-experience-edit" type={item.type}></input></div>))}
              </div>
              {this.state.vis[0] && <button class="edit-experiences-button">&#9998; Edit</button>}
              {this.state.vis[0] && <button onClick={this.addEducation.bind(this)} class="edit-experiences-button">&#9998; Add</button>}
            </div>
            
            <div className = "edit-experiences">
              <div className = "experience-titles">
                  <label id="plus-button" onClick={this.changeVisiblityTwo}>+</label>
                  <p class="experience-titles-text">Employment Post-Program Placement</p>
                </div>
                <div className = "flexbox-user-dashboard-big">
                  {this.state.vis[1] && this.state.programs.map((element, index) => this.state.fieldsTwo.map(item => <div><p id="experience-edit-field">{item.name}</p><input value={this.state.programs[index][item.id]} onChange={(e) => this.handleProgramChange(index, item.id, e)} class="input-experience-edit" type={item.type}></input></div>))}
                </div>
                {this.state.vis[1] && <button class="edit-experiences-button">&#9998; Edit</button>}
                {this.state.vis[1] && <button onClick={this.addProgram.bind(this)} class="edit-experiences-button">&#9998; Add</button>}
              </div>
            
            <div className = "edit-experiences">
              <div className = "experience-titles">
                  <label id="plus-button" onClick={this.changeVisiblityThree}>+</label>
                  <p class="experience-titles-text">Unemployed</p>
                </div>
                <div className = "flexbox-user-dashboard-big">
                  {this.state.vis[2] && this.state.unemployed.map((element, index) => this.state.fieldsThree.map(item => <div><p id="experience-edit-field">{item.name}</p><input value={this.state.unemployed[index][item.id]} onChange={(e) => this.handleUnemployedChange(index, item.id, e)} class="input-experience-edit" type={item.type}></input></div>))}
                </div>
                {this.state.vis[2] && <button class="edit-experiences-button">&#9998; Edit</button>}
                {this.state.vis[2] && <button onClick={this.addUnemployed.bind(this)} class="edit-experiences-button">&#9998; Add</button>}
              </div>
            </div>
          </div>

        </div>
      </body>
    )
  }
}

export default UserDashboard;
