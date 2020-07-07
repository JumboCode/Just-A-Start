import React, { Component } from 'react';
import {
  withRouter
} from "react-router-dom";
import Navbar from '../../components/Navbar/index';
import ProfileEdit from './components/ProfileEdit/index';
import Jobs from './components/Jobs/index';
import Educations from './components/Educations/index';
import './styles.css';

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.profileEditElement = React.createRef();
    this.state = {
      profile_data: {
      }
    }
  }

  componentDidMount = () => {
    const key = this.props.authToken

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${key}`
      },
    };

    fetch(`http://127.0.0.1:8000/api/user/get_user_profile/?key=${key}`, options)
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        this.setState({
          profile_data: {
            name: res[0]['fields']['first_name'] + " " + res[0]['fields']['last_name'],
            email: res[0]['fields']['email'],
            phone: res[0]['fields']['phone'],
            birthdate: res[0]['fields']['date_of_birth']
          }
        });
      })
      .catch(err => {
        console.log("FAIL " + err);
      });
  }
  
  profileEditClicked = () => {
      //this.setState({ profile_edit: "true" });
      this.profileEditElement.current.changeVisibilityOn(this.state.profile_data.name, this.state.profile_data.birthdate, this.state.profile_data.phone, this.state.profile_data.email);
  };
  
  handler(name, dob, phone, email){
    console.log(this.state.profile_data.name);
    this.setState({
      name: name,
      phone: phone,
      email: email,
      birthdate: dob,
    })
    this.forceUpdate();
  }
  
  changeVisiblityOne = () => {
    for(let x = 0; x < this.state.editEducation.length; x++){
      this.state.editEducation[x] = false;
      // this.setState({
      //   editEducation: false,
      // })
    }
    this.state.vis[0] = ! this.state.vis[0];
    this.forceUpdate();
  }

  addEducation = () => {
    this.state.Education.push(new Array(5));
    this.state.confirmedEducation.push(new Array(5));
    this.state.editEducation.push(false);
    this.forceUpdate();
  }
  
  editEducation(num){
    this.state.editEducation[num] = true;
    var a = document.getElementById("education"+num.toString()).querySelectorAll("input");
    for(let x = 0; x < a.length; x++){
      a[x].removeAttribute("disabled", "disabled");
    }
    this.forceUpdate();
  }
  
  confirmEducation(num){
    this.state.editEducation[num] = false;
    var a = document.getElementById("education"+num.toString()).querySelectorAll("input");
    for(let x = 0; x < a.length; x++){
      a[x].setAttribute("disabled", "disabled");
    }
    this.state.confirmedEducation[num] = this.state.Education[num]
    this.forceUpdate();
  }

  deleteEducation(num){
    this.state.Education.splice(num,1);
    this.state.confirmedEducation.splice(num,1);
    this.state.editEducation.splice(num,1);
    this.forceUpdate();
  }
  
  handleEducationChange(num, id, e){
    if(this.state.editEducation[num]){
      this.state.Education[num][id] = e.target.value;
      this.forceUpdate();
    }
  }

  render(){
    const background = {
      width: "100%",
      height: 2000,
      backgroundColor: "#eef6fe",
      position: "absolute"
    }

    return(
      <div>
      <Navbar/>
      <div style = {background}>
        <ProfileEdit handler = {this.handler} ref={this.profileEditElement}/>
        <div id="allthestuff">
          <div className = "profile">
            <div className = "top_text">
              <h1 className = "title">Profile</h1>
              <button onClick={this.profileEditClicked} className = "add" id = "edit">&#9998;</button>
            </div>
            <h1 className = "centered">{this.state.profile_data.name}</h1>
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
              <h1 className = "title">Experience</h1>
            </div>

            <Jobs authToken={this.props.authToken}/>
            <Educations authToken={this.props.authToken}/>
            
            {/* <div className = "edit-experiences">
              <div className = "experience-titles">
                  <label id="plus-button" onClick={this.changeVisiblityOne}>+</label>
                  <p class="experience-titles-text">Education/Training Post-Program Placement</p>
              </div>
              <div className = "flexbox-user-dashboard-big">
                {this.state.vis[0] && this.state.Education.map((element, index) => 
                <div id={"education" + index.toString()}>
                  {this.state.fieldsOne.map(item => 
                    <div >
                      <p id="experience-edit-field">{item.name}</p>
                      <input disabled = "disabled" value={this.state.confirmedEducation[index][item.id]} 
                            onChange={(e) => this.handleEducationChange(index, item.id, e)} class="input-experience-edit" type={item.type}></input>
                    </div>
                  )}
                  <div class="edit-experiences-button-div">
                    {!this.state.editEducation[index] && <button class="edit-experiences-button" onClick ={() => this.editEducation(index)}>Edit</button>}
                    {this.state.editEducation[index] && <button class="edit-experiences-button" onClick ={() => this.confirmEducation(index)}>Confirm</button>}
                    <button class="edit-experiences-button" onClick ={() => this.deleteEducation(index)}>Delete</button>
                  </div>
                </div>
                )}
              </div>
              {this.state.vis[0] && <button onClick={this.addEducation.bind(this)} class="edit-experiences-button" id = "add-button-experiences">&#9998; Add</button>}
            </div> */}
          </div> 
        </div>
      </div>
      </div>
    )
  }
}

export default withRouter(UserDashboard);