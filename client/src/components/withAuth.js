import React, { Component } from 'react';
import { connect } from 'react-redux';

export default AuthComponent => {
	class AuthenticatedComponent extends Component {
		componentDidMount() {
			this.shouldNavigateAway();
		}

		componentDidUpdate() {
			this.shouldNavigateAway();
		}

		shouldNavigateAway() {
			if (!this.props.auth) {
				this.props.history.push('/');
			}
		}

		render() {
			return <AuthComponent {...this.props} />;
		}
	}

	const mapStateToProps = state => ({
		auth: state.auth.authenticated,
	});

	return connect(mapStateToProps)(AuthenticatedComponent);
};
