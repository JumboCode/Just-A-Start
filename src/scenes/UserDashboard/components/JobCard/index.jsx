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
    var num = Number.parseFloat(event.target.value).toFixed(1);
    this.setState({payRate: num});
  }

  changeHoursWeekHandler = (event) => {
    var num = Number.parseFloat(event.target.value).toFixed(1);
    this.setState({hoursWeek: num});
  }

  changeStartDateHandler = (event) => {
    this.setState({startDate: event.target.value});
  }

  componentDidMount = () => {
    this.setState({
      employer: this.props.jobData["employer_org"],
      jobTitle: this.props.jobData["job_title"],
      payRate: this.props.jobData["pay_rate"],
      hoursWeek: this.props.jobData["hours_week"],
      startDate: this.props.jobData["start_date"],
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
                  onChange={this.changeEmployerNameHandler} className="input-experience-edit" type="text"></input>}
          {!editingJob && <input disabled="disabled" value={this.state.employer} 
                  onChange={this.changeEmployerNameHandler} className="input-experience-edit" type="text"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Job Title</p>
          {editingJob && <input value={this.state.jobTitle} 
                  onChange={this.changeJobTitleHandler} className="input-experience-edit" type="text"></input>}
          {!editingJob && <input disabled="disabled" value={this.state.jobTitle} 
                  onChange={this.changeJobTitleHandler} className="input-experience-edit" type="text"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Hourly Pay</p>
          {editingJob && <input value={this.state.payRate} 
                  onChange={this.changePayRateHandler} className="input-experience-edit" type="number" step="0.1"></input>}
          {!editingJob && <input disabled="disabled" value={this.state.payRate} 
                  onChange={this.changePayRateHandler} className="input-experience-edit" type="number" step="0.1"></input>}
        </div>
        
        <div>
          <p id="experience-edit-field">Number of Hours per Week</p>
          {editingJob && <input value={this.state.hoursWeek} 
                  onChange={this.changeHoursWeekHandler} className="input-experience-edit" type="number" step="0.1"></input>}
          {!editingJob && <input disabled = "disabled" value={this.state.hoursWeek} 
                  onChange={this.changeHoursWeekHandler} className="input-experience-edit" type="number" step="0.1"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Start Date</p>
          {editingJob && <input value={this.state.startDate} 
                  onChange={this.changeStartDateHandler} className="input-experience-edit" type="date"></input>}
          {!editingJob && <input disabled = "disabled" value={this.state.startDate} 
                  onChange={this.changeStartDateHandler} className="input-experience-edit" type="date"></input>}
        </div>

        <div className="edit-experiences-button-div">
          {!this.state.editingJob && <button className="edit-experiences-button" onClick ={this.editJob}>Edit</button>}
          {this.state.editingJob && <button className="edit-experiences-button" onClick ={this.confirmJob}>Confirm</button>}
          <button className="edit-experiences-button" onClick={() => this.props.deleteJob(this.props.item)}>Delete</button>
        </div>
      </div>
    )
  }
}

export default JobCard;