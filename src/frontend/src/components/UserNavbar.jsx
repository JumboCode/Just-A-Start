// import React, { pages } from 'react';

// class NavBar extends pages {
//     render() {
//       return (
//         <React.Fragment>
//           <nav className="navbar navbar-dark bg-dark mb-3">
//             <a className="navbar-brand" href="#">
//               <h1>Jobs </h1>
//               <h2>Event </h2>
//               <h3>Alumni </h3>
//               <h4> USER </h4>
//             </a>
//           </nav>
//         </React.Fragment>
//       );
//     }
//   }
   
//   export default NavBar;

import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import './UserNavbar.css';

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar color="blue" dark expand="md" >
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left className = "top">
            <MDBNavItem  className = "center">
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
            <MDBNavItem active className = "center">
              <MDBNavLink to="#!">Jobs</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem  className = "center">
              <MDBNavLink to="#!">Events</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem  className = "center">
              <MDBNavLink to="#!">Alumni</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className = "center">
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">User</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu >
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
    );
  }
}

export default NavbarPage