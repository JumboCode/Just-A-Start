import React, { Component } from 'react';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
class HomePage extends Component {
=======
class Homepage extends Component {
>>>>>>> 2d9f47491ce26d137445c98d8ec429ae34c66df2
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div>
				<Link to="admin-login">Admin Login</Link>
				<Link to="alumni-login">Alumni Login</Link>
			</div>
		);
	}
}

<<<<<<< HEAD
export default HomePage;
=======
export default Homepage;
>>>>>>> 2d9f47491ce26d137445c98d8ec429ae34c66df2
