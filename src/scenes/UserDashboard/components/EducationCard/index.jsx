import React, { Component } from 'react';
import { config } from '../../../../Constants'
import './styles.css';

class EducationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      institution_name: '',
      degree: '',
      program: '',
      startDate: '',
      editingEducation: false,
      conversion: {
        'associate':'Associate Degree',
        'bachelors':'Bachelor\'s Degree',
        'minor':'Minor',
        'masters':'Masters Degree',
        'phd':'Ph. D',
        'high school degree':'High School Diploma',
        'middle school degree':'Middle School Diploma',
        'training program':'Training Program',
      },
      error: ''
    }
  }

  editEducation = () => {
    this.setState({
      editingEducation: true,
    })
  }

  confirmEducation = () => {
    if (this.state.institution_name === "" || this.state.degree === "" || this.state.program === "" || 
        this.state.startDate === "") {
      this.setState({error: "Please fill in all fields."})
    } else {
      this.setState({
        editingEducation: false,
        error:""
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
          "name_of_institution": this.state.institution_name,
          "degree_type": this.state.degree,
          "program_name": this.state.program,
          "start_date": this.state.startDate,
        })
      };

      // Send updates to backend 
      fetch(`${config.url.API_URL}/api/educations/${this.props.id}/`, options)
        .then(res => res.json())
        .catch(err => {
          console.log("FAIL " + err);
        });
    }
  }

  changeInstitutionNameHandler = (event) => {
    this.setState({institution_name: event.target.value});
  }

  changeDegreeHandler = (event) => {
    this.setState({degree: event.target.value});
  }

  changeProgramHandler = (event) => {
    this.setState({program: event.target.value});
  }

  changeStartDateHandler = (event) => {
    this.setState({startDate: event.target.value});
  }

  componentDidMount = () => {
    this.setState({
      institution_name: this.props.educationData["name_of_institution"],
      degree: this.props.educationData["degree_type"],
      program: this.props.educationData["program_name"],
      startDate: this.props.educationData["start_date"],
    })
  }
  
  render() {
    const {editingEducation} = this.state;
    return(
      <div>
        <div>
          <p id="experience-edit-field">Name of School/Company</p>
          {editingEducation && <input value={this.state.institution_name} 
                  onChange={this.changeInstitutionNameHandler} className="input-experience-edit" type="text"></input>}
          {}
          {!editingEducation && <input disabled="disabled" value={this.state.institution_name} 
                  onChange={this.changeInstitutionNameHandler} className="input-experience-edit" type="text"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Type of Degree</p>
          {editingEducation && 
            <select value={this.state.degree} onChange={this.changeDegreeHandler} className="input-experience-edit">
              <option value="middle school degree">Middle School Diploma</option>
              <option value="high school degree">High School Diploma</option>
              <option value="training program">Training Program</option>
              <option value="associate">Associate Degree</option>
              <option value="minor">Minor</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Masters Degree</option>
              <option value="phd">Ph. D</option>
            </select>}
          {!editingEducation && <input disabled="disabled" value={this.state.conversion[this.state.degree]} 
                                       className="input-experience-edit" type="text"></input>}
        </div>
        
        <div>
          <p id="experience-edit-field">Program/Major</p>
          {editingEducation && <input value={this.state.program} 
                  onChange={this.changeProgramHandler} className="input-experience-edit" type="text"></input>}
          {!editingEducation && <input disabled = "disabled" value={this.state.program} 
                  onChange={this.changeProgramHandler} className="input-experience-edit" type="text"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Start Date</p>
          {editingEducation && <input value={this.state.startDate} 
                  onChange={this.changeStartDateHandler} className="input-experience-edit" type="date"></input>}
          {!editingEducation && <input disabled = "disabled" value={this.state.startDate} 
                  onChange={this.changeStartDateHandler} className="input-experience-edit" type="date"></input>}
        </div>

        <div className="edit-experiences-button-div">
          {!this.state.editingEducation && <button className="edit-experiences-button" onClick={this.editEducation}>Edit</button>}
          {this.state.editingEducation && <button className="edit-experiences-button" onClick={this.confirmEducation}>Confirm</button>}
          <button className="edit-experiences-button" onClick={() => this.props.deleteEducation(this.props.item)}>Delete</button>
          {this.state.error !== '' && (<p id="experience-edit-field">{this.state.error}<br/></p>)}
        </div>
      </div>
    )
  }
}

export default EducationCard;