import React from 'react';
import './styles.css';

class ProfileEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visibility: false,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      birthdate: this.props.birthdate,
      phone: this.props.phone,
      email: this.props.email,
    }
  }

  // setTextAreaFormat() {
  //   let text = "";
  //   let maxLines = 4;
  //   text = document.getElementById("textarea").value;
  //   let lh = 20
  //   let fs = 20;
  //   let dh = Math.round((lh/fs)*100)/100;
  //   if(text.rows === maxLines){
  //       text.style.height = Math.ceil((fs * text.rows * dh)+((fs*200)/300));
  //   }
  // }

  changeVisibilityOn(first_name, last_name, birthdate, phone, email){
    this.setState({
      first_name: first_name,
      last_name: last_name,
      birthdate: birthdate,
      email: email,
      phone: phone,
      visibility: true,
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
            <p className="left_text">First Name</p>
            <p className="left_text">Last Name</p>
            <p className="left_text">Date of Birth</p>
            <p className="left_text">Phone</p>
            <p className="left_text">Email</p>
          </div>
          <div className="flex_profile_edit" id="right_profile_edit">
            <input id="first_name_profile_edit" className="input_profile_edit" value ={this.state.first_name} onChange={this.handleFirstNameChange}/>
            <input id="last_name_profile_edit" className="input_profile_edit" value ={this.state.last_name} onChange={this.handleLastNameChange}/>
            <input type="date" id="dob_profile_edit" className="input_profile_edit" value={this.state.birthdate} onChange={this.handleBirthdateChange}/>
            <input id="phone_profile_edit" className="input_profile_edit" value={this.state.phone} onChange={this.handlePhoneChange}/>
            <input id="email_profile_edit" className="input_profile_edit" value={this.state.email} onChange={this.handleEmailChange}/>
          </div>
          <button onClick = {() => {
            this.changeVisibilityOff()
            // this.props.handler(document.getElementById("first_name_profile_edit").value, document.getElementById("last_name_profile_edit").value, 
            //                    document.getElementById("dob_profile_edit").value, document.getElementById("phone_profile_edit").value, 
            //                    document.getElementById("email_profile_edit").value)
            this.props.handler(this.state.first_name, this.state.last_name, this.state.birthdate, this.state.phone, this.state.email)}} 
            className="confirm">Confirm
          </button>
        </div>
        }
      </div>
    )
  }
}
export default ProfileEdit;
