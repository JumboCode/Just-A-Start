import React, { Component } from 'react';
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from 'jquery'
import './SideDashBoard.css';



class DashBoard extends Component {
    state = {
      dropdownVisible: false
    };

    constructor() {
        super();
    }

    toggleDropdown = () => this.setState(state => ({
      dropdownVisible: !state.dropdownVisible,
    }));

    outlineRed = () => {
      
    }

    render() {
        return (
          <div id="invisible-sdb">

            <div id="dropdown-sdb" className={this.state.dropdownVisible ?
               "button-sdb notVisible-sdb" : "button-sdb visible-sdb"}
               onClick={this.toggleDropdown}>
              <FontAwesomeIcon icon={faAlignJustify} size="2x" />
            </div>

            <div className={this.state.dropdownVisible ?
                "wrapper-dashboard visible-sdb" :
                "wrapper-dashboard notVisible-sdb" }>

              <div id="top-sdb">
                <span id="x-mark-sdb" className="button-sdb">
                  <FontAwesomeIcon icon={faTimes} size="2x"
                  onClick={this.toggleDropdown}/>
                </span>
                <span id="align-justify-sdb" className="button-sdb">
                  <FontAwesomeIcon icon={faAlignJustify} size="2x"
                  onClick={this.toggleDropdown}/>
                </span>
              </div>

              <div id="buttons-sdb">
                <div className="dashboard-button button-sdb">
                  <span> <FontAwesomeIcon icon={faHome} size="1x" /> </span>
                  <span> Dashboard </span>
                </div>
                <div className="dashboard-button button-sdb">
                  <span> <FontAwesomeIcon icon={faUsers} size="1x" /> </span>
                  <span> Users </span>
                </div>
                <div className="dashboard-button button-sdb">
                  <span> <FontAwesomeIcon icon={faBell} size="1x" /> </span>
                  <span> Notification </span>
                </div>
              </div>


            </div>
          </div>
        );
    }


}

export default DashBoard;
