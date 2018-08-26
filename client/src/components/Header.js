import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
	renderLink() {
		if (!this.props.auth) {
			return (
				<Fragment>
					<Link to="/">Redux Auth</Link>
					<Link to="/sign-up">Sign up</Link>
					<Link to="/sign-in">Sign in</Link>
				</Fragment>
			);
		}

		return (
			<Fragment>
				<Link to="/">Redux Auth</Link>
				<Link to="/sign-out">Sign out</Link>
				<Link to="/feature">Feature</Link>
			</Fragment>
		);
	}

	render() {
		return <div>{this.renderLink()}</div>;
	}
}

const mapStateToProps = state => ({
	auth: state.auth.authenticated,
});

export default connect(mapStateToProps)(Header);
