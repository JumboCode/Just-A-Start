import React, { Component } from 'react';
import EducationCard from '../EducationCard/index';
import './styles.css';

class Educations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vis: true,
      educationData: [],
      id: 0,
    }
    this.deleteEducation = this.deleteEducation.bind(this)
  }

  addEducation = () => {
    var newEducation = {
      name_of_institution: 'untitled',
      degree_type: 'associate',
      program_name: 'untitled',
      start_date: '2020-01-01',
    }

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.authToken}`
      },
      body: JSON.stringify(newEducation)
    };

    // Send request to backend
    fetch(`http://localhost:8000/educations/`, options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        newEducation = res

        var newEducationData = this.state.educationData
        newEducationData.push(newEducation)
        console.log(newEducation)

        // Send a request to backend
        this.setState({
          educationData: newEducationData,
        })
      })
      .catch(err => {
        console.log("FAIL " + err);
      });
  }

  deleteEducation = (item) => {
    var newEducationData = this.state.educationData

    var index = newEducationData.indexOf(item)
    if (index !== -1) {
      newEducationData.splice(index, 1);
      this.setState({educationData: newEducationData});
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

    fetch(`http://127.0.0.1:8000/educations/`, options)
      .then(res => res.json())
      .then(res => {
        var item
        var edusTemp = []
        var data = res['results']
        
        for (item of data) {
          edusTemp.push(item)
        }

        this.setState({
          educationData: edusTemp,
        })
      })
      .catch(err => {
        console.log("FAIL " + err);
      });
  }
    
  render() {
    const educations = this.state.educationData;
    var show = false;

    if (this.state.vis === true && educations !== undefined) {
      show = true
    }

    return(
        <div className = "edit-experiences">
          <div className = "experience-titles">
            <label id="plus-button" onClick={this.changeVisiblity}>+</label>
            <p className="experience-titles-text">Employment Post-Program Placement</p>
          </div>

          <div className = "flexbox-user-dashboard-big">
            {show && educations.map((element) => <EducationCard deleteEducation={this.deleteEducation} item={element} educationData={element} 
                                                                key={element['id']} id={element['id']} authToken={this.props.authToken}/>)}
          </div>
          {this.state.vis && <button onClick={this.addEducation} className="edit-experiences-button" id = "add-button-experiences">&#9998; Add</button>}
        </div>
    )
  }
}

export default Educations;