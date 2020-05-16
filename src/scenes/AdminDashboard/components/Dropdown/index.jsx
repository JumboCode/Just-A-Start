import React from 'react';
import './styles.css';

class AdminDashboardDropdown extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  
  render(){
    return(
      <div class="custom-select">
        <select>
          <option value="0">{this.props.name}</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
          <option value="6">Option 6</option>
          <option value="7">Option 7</option>
          <option value="8">Option 8</option>
          <option value="9">Option 9</option>
          <option value="10">Option 10</option>
          <option value="11">Option 11</option>
          <option value="12">Option 12</option>
        </select>
      </div>
    )
  }
}

export default AdminDashboardDropdown;
