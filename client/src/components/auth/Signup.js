import React, { PureComponent } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signup } from '../../actions';

class Signup extends PureComponent {
	handlerSignup = values => {
		this.props.signup(values, () => {
			console.log('go to feature');
			this.props.history.push('/feature');
		});
	};

	render() {
		const { handleSubmit, errorMessage } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handlerSignup)}>
				<fieldset>
					<label htmlFor="email-input">Email</label>
					<br />
					<Field
						name="email"
						type="text"
						component="input"
						id="email-input"
						placeholder="Your email"
						autoComplete="none"
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="password-input">Password</label>
					<br />
					<Field
						name="password"
						type="password"
						component="input"
						id="password-input"
						placeholder="Your password"
						autoComplete="none"
					/>
				</fieldset>
				<button type="submit">Sign up</button>
				{errorMessage && <p style={{ color: 'coral' }}>{errorMessage}</p>}
			</form>
		);
	}
}

const mapDispatchToProps = {
	signup: (formProps, cb) => signup(formProps, cb),
};

const mapStateToProps = state => ({
	errorMessage: state.auth.errorMessage,
});

const enchancer = compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	reduxForm({
		form: 'signup',
	})
);

export default enchancer(Signup);
