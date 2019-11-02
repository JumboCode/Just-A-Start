import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
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

export default Homepage;