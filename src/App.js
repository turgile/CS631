import React, { Component } from "react";
import Amplify, { API } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import Navigation from "./navbar";
import Input from "./UI/Input";
import { Form } from "react-bootstrap";

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
  } /*,
  API: {
    endpoints: [
      {
        name: "ServerlessQueryApi",
        endpoint: "https://o4rzqchnta.execute-api.us-east-1.amazonaws.com/beta"
      }
    ]
  }*/
});

//console.log(Auth.currentUserInfo());

class App extends Component {
  /*componentDidMount() {
    let apiName = "ServerlessQueryApi";
    let path = "/other";
    let myInit = {
      // OPTIONAL
      headers: {}, // OPTIONAL
      response: true // OPTIONAL (return entire response object instead of response.data)
    };
    API.get(apiName, path, myInit)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }*/
  render() {
    return (
      <div className="App">
        <Navigation />
        <Form>
          <Input
            label="Test"
            validationCallback={function(value) {
              if (value.length > 5) {
                return "error";
              } else {
                return null;
              }
            }}
            help="Enter help text here."
          />
          <Input
            label="Test"
            validationCallback={function(value) {
              if (value.length > 5) {
                return "error";
              } else {
                return null;
              }
            }}
            help="Enter help text here."
          />
        </Form>
      </div>
    );
  }
}

export default withAuthenticator(App);
