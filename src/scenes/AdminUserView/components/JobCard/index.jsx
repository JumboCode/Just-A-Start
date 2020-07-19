import React, { Component } from 'react';
import './styles.css';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (this.state.employer === "" || this.state.jobTitle === "" || this.state.payRate === "" || 
        this.state.hoursWeek === "" || this.state.startDate === "") {
      this.setState({error: "Please fill in all fields."})
    } else {
      this.setState({
        editingJob: false,
      })
  
      // Put together parameters for PATCH request
      const key = this.props.authToken
      const options = {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${key}`
        },
        body: JSON.stringify({
          "employer_org": this.state.employer,
          "job_title": this.state.jobTitle,
          "hours_week": this.state.hoursWeek,
          "pay_rate": this.state.payRate,
          "start_date": this.state.startDate,
        })
      };
  
      // Send updates to backend 
      fetch(`http://localhost:8000/jobs/${this.props.id}/`, options)
        .then(res => res.json())
        .catch(err => {
          console.log("FAIL " + err);
        });
    }
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
    const {editingJob} = this.state;
    return(
      <div id="entry">
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
      </div>
    )
  }
}

export default JobCard;