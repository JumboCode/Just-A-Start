import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formVisibility: 'off',
		}
	}

	onSubmit = () => {
		const { submitEndpoint } = this.props;
		/* placeholder for backend endpoint */
		fetch(`localhost:xxxx/${submitEndpoint}`)
			.then(() => {})
			.catch(() => {});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input type="text" placeholder="username/email address"/>
					<input type="password" placeholder="password"/>
					<Link to="">Forgot Password?</Link>
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default LoginForm;