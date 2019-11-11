import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
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
  render(){
    return(
      <body>
        <div>
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
              <input class="input_profile_edit"/>
              <input class="input_profile_edit"/>
              <input class="input_profile_edit"/>
              <input class="input_profile_edit"/>
              <input class="input_profile_edit"/>
              <textarea id="textarea" onKeyPress={this.setTextAreaFormat} />
            </div>
            <button class="confirm">Confirm</button>
          </div>
        </div>
      </body>
    )
  }
}
export default ProfileEdit;
