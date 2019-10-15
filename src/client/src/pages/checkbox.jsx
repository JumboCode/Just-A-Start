import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './form.css';

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
          <label> Remember Password?
            <input type="checkbox" defaultChecked={this.state.isChecked} onChange={this.handleCheck}/>
          </label>
        );
    }

}

export default CheckBox;
