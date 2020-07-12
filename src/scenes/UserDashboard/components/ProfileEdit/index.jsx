import React from 'react';
import './styles.css';

class ProfileEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visibility: false,
      iteration: 1,
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      birthdate: ""
    }
  }

  setTextAreaFormat() {
    let text = "";
    let maxLines = 4;
    text = document.getElementById("textarea").value;
    let lh = 20
    let fs = 20;
    let dh = Math.round((lh/fs)*100)/100;
    if(text.rows === maxLines){
        text.style.height = Math.ceil((fs * text.rows * dh)+((fs*200)/300));
    }
  }

  changeVisibilityOn(name, dob, phone, email){
    this.setState({
      name: name,
      email: email,
      phone: phone,
      brithdate: dob,
      visibility: true
    })
    this.forceUpdate();
  };
  
  changeVisibilityOff = () => {
    this.setState({
      visibility: false
    });
  };
  
  handleFirstNameChange = (event) => {
    this.setState({first_name: event.target.value})
  };
  handleLastNameChange = (event) => {
    this.setState({last_name: event.target.value})
  };
  handleBirthdateChange = (event) => {
    this.setState({birthdate: event.target.value})
  };
  handlePhoneChange = (event) => {
    this.setState({phone: event.target.value})
  };
  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  };

  render(){
    return(
      <div>
        {this.state.visibility && 
        <div className="box_profile_edit">
          <div className="flex_profile_edit" id="left_profile_edit">
            <p className = "left_text">First Name</p>
            <p className = "left_text">Last Name</p>
            <p className = "left_text">Date of Birth</p>
            <p className = "left_text">Phone</p>
            <p className = "left_text">Email</p>
          </div>
          <div className="flex_profile_edit" id="right_profile_edit">
            <input id="first_name_profile_edit" className="input_profile_edit" value ={this.state.first_name} onChange={this.handleFirstNameChange}/>
            <input id="last_name_profile_edit" className="input_profile_edit" value ={this.state.last_name} onChange={this.handleLastNameChange}/>
            <input id="dob_profile_edit" className="input_profile_edit" value ={this.state.birthdate} onChange={this.handleBirthdateChange}/>
            <input id="phone_profile_edit" className="input_profile_edit" value ={this.state.phone} onChange={this.handlePhoneChange}/>
            <input id="email_profile_edit" className="input_profile_edit" value ={this.state.email} onChange={this.handleEmailChange}/>
          </div>
          <button onClick = {() => {
                  this.changeVisibilityOff();
                  // this.props.handler(document.getElementById("name_profile_edit").value, document.getElementById("dob_profile_edit").value, document.getElementById("location_profile_edit").value, document.getElementById("phone_profile_edit").value, document.getElementById("email_profile_edit").value, document.getElementById("textarea").value)}} class="confirm">Confirm</button>
                  this.props.handler(document.getElementById("first_name_profile_edit").value, document.getElementById("last_name_profile_edit").value, document.getElementById("dob_profile_edit").value, document.getElementById("phone_profile_edit").value, document.getElementById("email_profile_edit").value)}} className="confirm">Confirm</button>
        </div>
        }
      </div>
    )
  }
}
export default ProfileEdit;
