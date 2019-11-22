import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './form.css';
import './checkbox.css';

class CheckBox extends Component {
    state = {
      isChecked: false
    };

    handleCheck = (event) => {
      this.setState((prevState, props) => (
        {checked: (prevState.ischecked == false) ? true : false}));
      //console.log("In checkbox:" + this.state.isChecked);
      this.props.checked();
    }
    render() {
        return (

          <label id="check">
            <input id="box1" type="checkbox" defaultChecked={this.state.isChecked} onChange={this.handleCheck}/>
            <span id="check-text"> Keep me logged in </span>
          </label>
        );
    }

}

export default CheckBox;
