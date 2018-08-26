import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
	componentDidMount() {
		this.props.signout();
	}

	render() {
		return <div>Sorry to see you go</div>;
	}
}

const mapDispatchToProps = {
	...actions,
};

export default connect(
	null,
	mapDispatchToProps
)(Signout);
