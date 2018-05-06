import React, { Component } from "react";
import Amplify, { Auth } from "aws-amplify";

class Authorization extends Component {
	constructor(props) {
		super(props);
		if (this.props.group == null) {
			this.state = { show: false, group: null };
		} else {
			this.state = { show: false, group: this.props.group };
		}
	}
	componentDidMount() {
		Auth.currentAuthenticatedUser().then(credentials => {
			credentials.getSession(
				function(err, session) {
					if (err) {
						return;
					}
					let group = session.getAccessToken().payload[
						"cognito:groups"
					];
					this.setState({
						show: group.indexOf(this.state.group) >= 0
					});
				}.bind(this)
			);
		});
	}
	render() {
		return this.state.show ? this.props.children : null;
	}
}

export default Authorization;
