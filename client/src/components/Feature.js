import React, { Component } from 'react';
import withAuth from './withAuth';

class Feature extends Component {
	render() {
		return <div>This is the feature!</div>;
	}
}

export default withAuth(Feature);
