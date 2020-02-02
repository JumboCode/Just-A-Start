import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './JobEntry.css';
import PropTypes from 'prop-types';

class JobEntry extends React.Component {
  constructor(props) {
    super(props);
  }


  // componentDidMount = () => {
  //
  //     this.items = this.props.data.description;
  //     console.log(this.items);
  //     // .map((item, key) => {
  //     //   <li key={item.id}> {item} </li>
  //     // })
  //
  //
  // }

  render(){
    const { data } = this.props;
    return (
      <div className = "flex_container_job_entry">
        <div className = "text_container">
          <div id = "left_text">
            <p id = "large" >{data.job_title}</p>
            <p id = "medium" >{data.company}</p>
            <p id = "small" >{data.city}</p>
          </div>
          <div id = "right_text" >
            <p id = "large" >{data.job_length}</p>
            <p id = "small" >{data.hours_per_week}</p>
            <p id = "small" >{data.salary}</p>
          </div>
        </div>
        <div className = "list_job_entry">
          <ul >
            {data.description.map(item => (<li class = "full_length_job_entry" key={item.id}> {item.text} </li>))}
          </ul>
        </div>
      </div>
    )
  }
}

// JobEntry.propTypes = {
//   data: PropTypes.shape({
//     job_title: PropTypes.string,
//     company: PropTypes.string,
//     city: PropTypes.string,
//     job_length: PropTypes.string,
//     hours_per_week: PropTypes.string,
//     salary: PropTypes.string,
//     id: PropTypes.isRequired,
//   })
// }

export default JobEntry;
