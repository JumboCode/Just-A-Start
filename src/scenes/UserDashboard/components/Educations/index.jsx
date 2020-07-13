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
      education: {
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

    var newEducationData = this.state.educationData
    newEducationData.push(newEducation)

    // Send a request to backend
    this.setState({
      educationData: newEducationData,
      id: this.state.id + 1
    })
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

    fetch(`http://127.0.0.1:8000/api/user/get_user_experiences/?key=${key}`, options)
      .then(res => res.json())
      .then(res => {
        var item
        var edusTemp = []
        var id = this.state.id
        
        for (item of res) {
          if (item['model'] === "api.education") {
            edusTemp.push({education: item, id: id})
            id += 1
          }
        }

        this.setState({
            educationData: edusTemp,
          id: id,
        })

      })
      .catch(err => {
        console.log("FAIL " + err);
      });
  }
    
  render() {
    const educations = this.state.educationData;
    // console.log(educations)
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
            {show && educations.map((element) => <EducationCard deleteEducation={this.deleteEducation} item={element} educationData={element['education']} key={element['id']} id={element['id']}/>)}
          </div>
          {this.state.vis && <button onClick={this.addEducation} className="edit-experiences-button" id = "add-button-experiences">&#9998; Add</button>}
        </div>
    )
  }
}

export default Educations;