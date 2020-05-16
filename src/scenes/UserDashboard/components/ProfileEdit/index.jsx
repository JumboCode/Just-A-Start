import React from 'react';
import './styles.css';

class ProfileEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visibility: false,
      iteration: 1,
      name: "a",
      location: "",
      about: "",
      phone: "",
      email: "",
      birthdate: ""
    }
    
  }
  setTextAreaFormat() {
    let lines = [];
    let text = "";
    let maxLines = 4;
    let width = document.getElementById("textarea").height;
    let maxTextForLine = width/100;
    text = document.getElementById("textarea").value;

    let lh = 20
    let fs = 20;
    let dh = Math.round((lh/fs)*100)/100;
    if(text.rows == maxLines){
        text.style.height = Math.ceil((fs * text.rows * dh)+((fs*200)/300));
    }

  }
  changeVisibilityOn(name, dob, location, phone, email, about){
    console.log(name)
    this.state.name = name;
    this.state.location = location;
    this.state.about = about;
    this.state.phone = phone;
    this.state.email = email;
    this.state.birthdate = dob;
    this.state.visibility = true;
    this.forceUpdate();
  };
  
  changeVisibilityOff = () => {
    this.setState({
      visibility: false
    });
  };
  
  handleNameChange = (event) => {
    this.setState({name: event.target.value})
  };
  handleBirthdateChange = (event) => {
    this.setState({birthdate: event.target.value})
  };
  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  };
  handlePhoneChange = (event) => {
    this.setState({phone: event.target.value})
  };
  handleLocationChange = (event) => {
    this.setState({location: event.target.value})
  };
  handleAboutChange = (event) => {
    this.setState({about: event.target.value})
  };
  render(){
    return(
      <div>
        {this.state.visibility && 
        <div class="box_profile_edit">
          <div class="flex_profile_edit" id="left_profile_edit">
            <p class = "left_text">Name</p>
            <p class = "left_text">Date of Birth</p>
            <p class = "left_text">Location</p>
            <p class = "left_text">Phone</p>
            <p class = "left_text">Email</p>
            <p class = "left_text">About</p>
          </div>
          <div class="flex_profile_edit" id="right_profile_edit">
            <input id="name_profile_edit" class="input_profile_edit" value ={this.state.name} onChange={this.handleNameChange}/>
            <input id="dob_profile_edit" class="input_profile_edit" value ={this.state.birthdate} onChange={this.handleBirthdateChange}/>
            <input id="location_profile_edit" class="input_profile_edit" value ={this.state.location} onChange={this.handleLocationChange}/>
            <input id="phone_profile_edit" class="input_profile_edit" value ={this.state.phone} onChange={this.handlePhoneChange}/>
            <input id="email_profile_edit" class="input_profile_edit" value ={this.state.email} onChange={this.handleEmailChange}/>
            <textarea id="textarea" onKeyPress={this.setTextAreaFormat} value={this.state.about} onChange={this.handleAboutChange}/>
          </div>
          <button onClick = {() => {
                  this.changeVisibilityOff();
                  this.props.handler(document.getElementById("name_profile_edit").value, document.getElementById("dob_profile_edit").value, document.getElementById("location_profile_edit").value, document.getElementById("phone_profile_edit").value, document.getElementById("email_profile_edit").value, document.getElementById("textarea").value)}} class="confirm">Confirm</button>
        </div>
        }
      </div>
    )
  }
}
export default ProfileEdit;
