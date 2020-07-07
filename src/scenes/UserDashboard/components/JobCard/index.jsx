import React, { Component } from 'react';
import './styles.css';

class JobCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vis: [false, false],
      employer: '',
      jobTitle: '',
      payRate: '',
      hoursWeek: '',
      startDate: '',
      editingJob: false,
    }
  }

  editJob = () => {
    this.setState({
      editingJob: true,
    })
  }

  confirmJob = () => {
    this.setState({
      editingJob: false,
    })

    // Send request to backend
  }

  changeEmployerNameHandler = (event) => {
    this.setState({employer: event.target.value});
  }

  changeJobTitleHandler = (event) => {
    this.setState({jobTitle: event.target.value});
  }

  changePayRateHandler = (event) => {
    this.setState({payRate: event.target.value});
  }

  changeHoursWeekHandler = (event) => {
    this.setState({hoursWeek: event.target.value});
  }

  changeStartDateHandler = (event) => {
    this.setState({startDate: event.target.value});
  }

  componentDidMount = () => {
    this.setState({
      employer: this.props.jobData['fields']["employer_org"],
      jobTitle: this.props.jobData['fields']["job_title"],
      payRate: this.props.jobData['fields']["pay_rate"],
      hoursWeek: this.props.jobData['fields']["hours_week"],
      startDate: this.props.jobData['fields']["start_date"],
    })
  }
  
  render() {
    // console.log(this.props)
    const {editingJob} = this.state;
    return(
      <div>
        <div>
          <p id="experience-edit-field">Name of Employer</p>
          {editingJob && <input value={this.state.employer} 
                  onChange={this.changeEmployerNameHandler} class="input-experience-edit" type="text"></input>}
          {!editingJob && <input disabled="disabled" value={this.state.employer} 
                  onChange={this.changeEmployerNameHandler} class="input-experience-edit" type="text"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Job Title</p>
          {editingJob && <input value={this.state.jobTitle} 
                  onChange={this.changeJobTitleHandler} class="input-experience-edit" type="text"></input>}
          {!editingJob && <input disabled="disabled" value={this.state.jobTitle} 
                  onChange={this.changeJobTitleHandler} class="input-experience-edit" type="text"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Hourly Pay</p>
          {editingJob && <input value={this.state.payRate} 
                  onChange={this.changePayRateHandler} class="input-experience-edit" type="number"></input>}
          {!editingJob && <input disabled="disabled" value={this.state.payRate} 
                  onChange={this.changePayRateHandler} class="input-experience-edit" type="number"></input>}
        </div>
        
        <div>
          <p id="experience-edit-field">Number of Hours per Week</p>
          {editingJob && <input value={this.state.hoursWeek} 
                  onChange={this.changeHoursWeekHandler} class="input-experience-edit" type="text"></input>}
          {!editingJob && <input disabled = "disabled" value={this.state.hoursWeek} 
                  onChange={this.changeHoursWeekHandler} class="input-experience-edit" type="text"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Start Date</p>
          {editingJob && <input value={this.state.startDate} 
                  onChange={this.changeStartDateHandler} class="input-experience-edit" type="text"></input>}
          {!editingJob && <input disabled = "disabled" value={this.state.startDate} 
                  onChange={this.changeStartDateHandler} class="input-experience-edit" type="text"></input>}
        </div>

        <div class="edit-experiences-button-div">
          {!this.state.editingJob && <button class="edit-experiences-button" onClick ={this.editJob}>Edit</button>}
          {this.state.editingJob && <button class="edit-experiences-button" onClick ={this.confirmJob}>Confirm</button>}
          <button class="edit-experiences-button" onClick={() => this.props.deleteJob(this.props.item)}>Delete</button>
        </div>
      </div>
    )
  }
}

export default JobCard;