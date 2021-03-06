import React, { Component } from "react";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import Navigation from "./navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Exercise from "./Exercise";
import Employee from "./Employee";
import Membership from "./Membership";
import Member from "./Member";
import Room from "./Room";
import Class from "./Class";
import Salary from "./Salary";
import ClassSignUp from "./ClassSignUp";
import Profile from "./Profile";

import { Grid, Row, Col } from "react-bootstrap";

Amplify.configure({
	Auth: {
		// REQUIRED - Amazon Cognito Identity Pool ID
		identityPoolId: "us-east-2:e0ccd5c2-810f-476e-8070-db8a5bfac194",
		// REQUIRED - Amazon Cognito Region
		region: "us-east-2",
		// OPTIONAL - Amazon Cognito User Pool ID
		userPoolId: "us-east-2_MPNhAtWNT",
		// OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
		userPoolWebClientId: "34jtv1h75oqar27ka2pc2q86ra",
		// OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
		mandatorySignIn: true
	},
	API: {
		endpoints: [
			{
				name: "FitnessClub",
				endpoint:
					"https://7w73iu6up9.execute-api.us-east-1.amazonaws.com/development"
			}
		]
	}
});

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Grid>
						<Row>
							<Col>
								<Navigation />
							</Col>
						</Row>
						<Row>
							<Col>
								<Route exact path="/" component={Dashboard} />
								<Route
									path="/management/exercise"
									component={Exercise}
								/>
								<Route
									path="/management/employee"
									component={Employee}
								/>
								<Route
									path="/management/membership"
									component={Membership}
								/>
								<Route
									path="/management/member"
									component={Member}
								/>
								<Route
									path="/management/room"
									component={Room}
								/>
								<Route
									path="/management/class"
									component={Class}
								/>
								<Route
									path="/reports/salary"
									component={Salary}
								/>
								<Route path="/class" component={ClassSignUp} />
								<Route path="/profile" component={Profile} />
							</Col>
						</Row>
					</Grid>
				</Router>
			</div>
		);
	}
}
export default withAuthenticator(App);
