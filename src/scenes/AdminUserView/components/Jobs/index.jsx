import React, { Component } from 'react';
import JobCard from '../JobCard/index';
import './styles.css';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vis: true,
      jobData: [],
    }
    this.deleteJob = this.deleteJob.bind(this)
  }

  addJob = () => {
    var newJob = {
      employer_org: 'Untitled',
      job_title: 'Untitled',
      pay_rate: '0',
      hours_week: '0',
      start_date: '2020-01-01',
    }

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.authToken}`
      },
      body: JSON.stringify(newJob)
    };

    // Send request to backend
    fetch(`http://localhost:8000/jobs/`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        newJob = res

        var newJobData = this.state.jobData
        newJobData.push(newJob)
        console.log(newJob)

        this.setState({
          jobData: newJobData,
        })
      })
      .catch(err => {
        console.log("FAIL " + err);
      });
  }

  deleteJob = (item) => {
    var newJobData = this.state.jobData

    var index = newJobData.indexOf(item)
    if (index !== -1) {
      newJobData.splice(index, 1);
      this.setState({jobData: newJobData});
    }

    // Send a request to backend
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.authToken}`
      }
    };

    // Send updates to backend 
    fetch(`http://localhost:8000/jobs/${item.id}/`, options)
      .then(res => res.json())
      .catch(err => {
        console.log("FAIL " + err);
      });
  }

  changeVisiblity = () => {
    var new_value = !this.state.vis
    this.setState({
      vis: new_value
    })
  }

  componentDidMount = () => {
    const key = this.props.authToken

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${key}`
      },
    };

    fetch(`http://127.0.0.1:8000/admin_job/`, options)
      .then(res => res.json())
      .then(res => {
        var item
        var jobsTemp = []
        var data = res['results']

        for (item of data) {
          if (item.user_id === this.props.id) {
            jobsTemp.push(item)
          }  
        }

        this.setState({
          jobData: jobsTemp,
        })
      })
      .catch(err => {
        console.log("FAIL " + err);
      });
  }

  componentDidUpdate = () => {
    
  }
    
  render() {
    const jobs = this.state.jobData;
    var show = false;

    if (this.state.vis === true && jobs !== undefined) {
      show = true
    }

    return(
      <div className = "edit-experiences">
        <div className = "experience-titles">
            <label id="plus-button" onClick={this.changeVisiblity}>+</label>
            <p className="experience-titles-text">Employment Post-Program Placement</p>
        </div>
        <div className = "flexbox-user-dashboard-big">
          {show && jobs.map((element) => <JobCard deleteJob={this.deleteJob} item={element} jobData={element}
                                                  key={element['id']} id={element['id']} authToken={this.props.authToken}/>)}
        </div>
      </div>
    )
  }
}

export default Jobs;