import React, { PureComponent } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signin } from '../../actions';

class Signin extends PureComponent {
	handleSignin = values => {
		this.props.signin(values, () => {
			console.log('go to feature');
			this.props.history.push('/feature');
		});
	};

	render() {
		const { handleSubmit, errorMessage } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleSignin)}>
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
				<button type="submit">Sign in</button>
				{errorMessage && <p style={{ color: 'coral' }}>{errorMessage}</p>}
			</form>
		);
	}
}

const mapDispatchToProps = {
	signin: (formProps, cb) => signin(formProps, cb),
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
		form: 'signin',
	})
);

export default enchancer(Signin);
