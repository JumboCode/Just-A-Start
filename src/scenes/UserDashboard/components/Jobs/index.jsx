import React, { Component } from 'react';
import JobCard from '../JobCard/index';
import './styles.css';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vis: true,
      jobData: [],
      id: 0,
    }
    this.deleteJob = this.deleteJob.bind(this)
  }

  addJob = () => {
    var newJob = {
      job: {
        fields: {
          employer_org: '',
          job_title: '',
          pay_rate: '',
          hours_week: '',
          start_date: '',
        }
      },
      id: this.state.id
    }

    console.log(this.state.jobData)
    var newJobData = this.state.jobData
    newJobData.push(newJob)
    console.log(newJobData)

    // Send a request to backend
    this.setState({
      jobData: newJobData,
      id: this.state.id + 1
    })
  }

  deleteJob = (item) => {
    var newJobData = this.state.jobData
    // var newJobData = this.state.jobData.slice();  

    var index = newJobData.indexOf(item)
    if (index !== -1) {
      newJobData.splice(index, 1);
      this.setState({jobData: newJobData});
    }

    // Send a request to backend
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

    fetch(`http://127.0.0.1:8000/api/user/get_user_experiences/?key=${key}`, options)
      .then(res => res.json())
      .then(res => {
        var item
        var jobsTemp = []
        var id = this.state.id
        
        for (item of res) {
          if (item['model'] === "api.job") {
            jobsTemp.push({job: item, id: id})
            id += 1
          }
        }

        // console.log(jobsTemp)
        this.setState({
          jobData: jobsTemp,
          id: id,
        })

      })
      .catch(err => {
        console.log("FAIL " + err);
      });
  }
    
  render() {
    const jobs = this.state.jobData;
    console.log(jobs)
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
          {show && jobs.map((element) => <JobCard deleteJob={this.deleteJob} item={element} jobData={element['job']} key={element['id']} id={element['id']}/>)}
        </div>
        {this.state.vis && <button onClick={this.addJob} className="edit-experiences-button" id="add-button-experiences">&#9998; Add</button>}
      </div>
    )
  }
}

export default Jobs;