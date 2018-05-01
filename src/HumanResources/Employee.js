import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import "./employee.css";

Amplify.configure({
  aws_appsync_graphqlEndpoint:
    "https://us55vll4gngv7iv2i4drocdgea.appsync-api.us-east-2.amazonaws.com/graphql",
  aws_appsync_region: "us-east-2",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: "da2-yuv4hi4zgzc4xnbwrtnsngux4u"
});
class Employee extends Component {
  state = { show: true, employee: {} };

  componentDidMount() {
    this.setState({ show: true, employee: this.props.employee });
    // Simple query
    const ListEvents = `query ListRoles {
      listRoles {
        items {
          name
        }
      }
    }`;
    const allEvents = API.graphql(graphqlOperation(ListEvents));
    console.log(allEvents);
  }
  showHide = () => {
    let current = this.state.show;
    this.setState({ show: !current });
  };
  handleChange = e => {
    let employee = this.state.employee;
    employee.name = e.target.value;
    this.setState({ employee: employee });
  };

  validation = () => {
    if (this.state.employee.name.length < 5) {
      return "error";
    } else {
      return null;
    }
  };

  render() {
    return (
      <tr>
        <td className="col-md-3">
          {this.state.show ? (
            this.state.employee.name
          ) : (
            <FormGroup validationState={this.validation()}>
              <FormControl
                type="text"
                onChange={this.handleChange}
                bsSize="small"
                value={this.state.employee.name}
              />
            </FormGroup>
          )}
        </td>
        <td className="col-md-6">
          {this.state.employee.salary === "None"
            ? this.state.employee.hours +
              " hours @ $" +
              this.state.employee.hourlyRate +
              " per hour."
            : "$" + this.state.employee.salary + " annual"}
        </td>
        <td className="col-md-3">
          <div>
            <Button
              onClick={this.showHide}
              bsStyle={this.state.show ? "warning" : "primary"}
            >
              {this.state.show ? "Edit" : "Save"}
            </Button>
            {this.state.show ? "" : <Button bsStyle="danger">Delete</Button>}
          </div>
        </td>
      </tr>
    );
  }
}

export default Employee;
