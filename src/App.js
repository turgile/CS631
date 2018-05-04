import React, { Component } from "react";
import Amplify, { Auth, Signer } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import Navigation from "./navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Exercise from "./Exercise";
import HumanResources from "./HumanResources";
import { Grid, Row, Col } from "react-bootstrap";
import AWS from "aws-sdk";

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
        name: "EmployeeUpdate",
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
                <Route exact path="/" component={Home} />
                <Route path="/exercise-management" component={Exercise} />
                <Route path="/human-resources" component={HumanResources} />
              </Col>
            </Row>
          </Grid>
        </Router>
      </div>
    );
  }
}
export default withAuthenticator(App);
