import React, { Component } from 'react';
import './styles.css';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vis: [false, false],
      institution_name: '',
      degree: '',
      institution_type: '',
      program: '',
      startDate: '',
      editingEducation: false,
    }
  }

  editEducation = () => {
    this.setState({
      editingEducation: true,
    })
  }

  confirmEducation = () => {
    this.setState({
      editingEducation: false,
    })

    // Send request to backend
  }

  changeInstitutionNameHandler = (event) => {
    this.setState({institution_name: event.target.value});
  }

  changeDegreeHandler = (event) => {
    this.setState({degree: event.target.value});
  }

  changeInstitutionTypeHandler = (event) => {
    this.setState({institution_type: event.target.value});
  }

  changeProgramHandler = (event) => {
    this.setState({program: event.target.value});
  }

  changeStartDateHandler = (event) => {
    this.setState({startDate: event.target.value});
  }

  componentDidMount = () => {
    this.setState({
      institution_name: this.props.educationData['fields']["name_of_institution"],
      degree: this.props.educationData['fields']["type_of_degree"],
      institution_type: this.props.educationData['fields']["type_of_institution"],
      program: this.props.educationData['fields']["program"],
      startDate: this.props.educationData['fields']["start_date"],
    })
  }
  
  render() {
    // console.log(this.props)
    const {editingJob} = this.state;
    return(
      <div>
        <div>
          <p id="experience-edit-field">Name of School/Company</p>
          {editingJob && <input value={this.state.institution_name} 
                  onChange={this.changeInstitutionNameHandler} className="input-experience-edit" type="text"></input>}
          {!editingJob && <input disabled="disabled" value={this.state.institution_name} 
                  onChange={this.changeInstitutionNameHandler} className="input-experience-edit" type="text"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Type of Degree/Certificate</p>
          {editingJob && <input value={this.state.degree} 
                  onChange={this.changeDegreeHandler} className="input-experience-edit" type="text"></input>}
          {!editingJob && <input disabled="disabled" value={this.state.degree} 
                  onChange={this.changeDegreeHandler} className="input-experience-edit" type="text"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Type of Institution</p>
          {editingJob && <input value={this.state.institution_type} 
                  onChange={this.changeInstitutionTypeHandler} className="input-experience-edit" type="number"></input>}
          {!editingJob && <input disabled="disabled" value={this.state.institution_type} 
                  onChange={this.changeInstitutionTypeHandler} className="input-experience-edit" type="number"></input>}
        </div>
        
        <div>
          <p id="experience-edit-field">Program/Major</p>
          {editingJob && <input value={this.state.program} 
                  onChange={this.changeProgramHandler} className="input-experience-edit" type="text"></input>}
          {!editingJob && <input disabled = "disabled" value={this.state.program} 
                  onChange={this.changeProgramHandler} className="input-experience-edit" type="text"></input>}
        </div>

        <div>
          <p id="experience-edit-field">Start Date</p>
          {editingJob && <input value={this.state.startDate} 
                  onChange={this.changeStartDateHandler} className="input-experience-edit" type="text"></input>}
          {!editingJob && <input disabled = "disabled" value={this.state.startDate} 
                  onChange={this.changeStartDateHandler} className="input-experience-edit" type="text"></input>}
        </div>

        <div className="edit-experiences-button-div">
          {!this.state.editingJob && <button className="edit-experiences-button" onClick ={this.editEducation}>Edit</button>}
          {this.state.editingJob && <button className="edit-experiences-button" onClick ={this.confirmEducation}>Confirm</button>}
          <button className="edit-experiences-button" onClick={() => this.props.deleteEducation(this.props.item)}>Delete</button>
        </div>
      </div>
    )
  }
}

export default JobCard;