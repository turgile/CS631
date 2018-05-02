import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import {
  Button,
  FormControl,
  FormGroup,
  ButtonGroup,
  Radio
} from "react-bootstrap";
import Flat from "../HOC/Flat";
import "./employee.css";

/*Amplify.configure({
  aws_appsync_graphqlEndpoint:
    "https://us55vll4gngv7iv2i4drocdgea.appsync-api.us-east-2.amazonaws.com/graphql",
  aws_appsync_region: "us-east-2",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: "da2-yuv4hi4zgzc4xnbwrtnsngux4u"
});*/
class Employee extends Component {
  state = { show: true, employee: {}, salary: true };

  componentDidMount() {
    this.setState({
      show: true,
      employee: this.props.employee,
      salary: !(this.props.employee.salary == "None")
    });
    // Simple query
    /*const ListEvents = `query ListRoles {
      listRoles {
        items {
          name
        }
      }
    }`;
    const allEvents = API.graphql(graphqlOperation(ListEvents));
    console.log(allEvents);*/
  }
  showHide = () => {
    let current = this.state.show;
    let employee = this.state.employee;

    if (this.isSalary()) {
      employee.hourlyRate = "None";
    } else {
      employee.salary = "None";
    }
    this.setState({
      show: !current,
      employee: employee,
      salary: this.isSalary()
    });
    let request = {
      // OPTIONAL
      headers: { "Content-Type": "application/json" }, // OPTIONAL
      body: {
        employeeId: Number(employee.id),
        salary: Number(employee.salary == "None" ? 0 : employee.salary),
        hourlyRate: Number(
          employee.hourlyRate == "None" ? 0 : employee.hourlyRate
        ),
        hours: Number(employee.hours),
        name: employee.name
      },
      response: true // OPTIONAL (return entire response object instead of response.data)
    };
    console.log(request);
    API.put("EmployeeUpdate", "/employee", request)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleChangeName = e => {
    let employee = this.state.employee;
    employee.name = e.target.value;
    this.setState({ employee: employee });
  };

  handleChangeSalary = e => {
    let employee = this.state.employee;
    if (this.isSalary()) {
      employee.hourlyRate = "None";
      employee.salary = e.target.value;
    } else {
      employee.salary = "None";
      employee.hourlyRate = e.target.value;
    }
    this.setState({ employee: employee, salary: this.isSalary() });
  };

  handleRadioCheck = (type, e) => {
    return function(e) {
      let employee = this.state.employee;
      if (type == "salary") {
        employee.salary = employee.hourlyRate * employee.hours;
        employee.hourlyRate = "None";
      } else {
        employee.hourlyRate =
          !employee.hours || employee.hours == "None"
            ? employee.salary
            : employee.salary / employee.hours;
        employee.salary = "None";
      }
      this.setState({ salary: type == "salary", employee: employee });
    }.bind(this);
  };

  validateName = () => {
    if (this.state.employee.name.length < 5) {
      return "error";
    } else {
      return null;
    }
  };

  isSalary = () => {
    return this.state.salary;
  };

  isEditMode = () => {
    return this.state.show;
  };

  render() {
    return (
      <tr>
        <td className="col-md-3">
          {this.isEditMode() ? (
            this.state.employee.name
          ) : (
            <FormGroup validationState={this.validateName()}>
              <FormControl
                type="text"
                onChange={this.handleChangeName}
                bsSize="small"
                value={this.state.employee.name}
              />
            </FormGroup>
          )}
        </td>
        <td className="col-md-6">
          {this.isEditMode() ? (
            this.state.employee.salary === "None" ? (
              (this.state.employee.hours == "None"
                ? "0"
                : this.state.employee.hours) +
              " hours @ $" +
              this.state.employee.hourlyRate +
              " per hour."
            ) : (
              "$" + this.state.employee.salary + " annual"
            )
          ) : (
            <FormGroup>
              <FormControl
                type="number"
                onChange={this.handleChangeSalary}
                bsSize="small"
                value={
                  this.state.salary
                    ? this.state.employee.salary
                    : this.state.employee.hourlyRate
                }
              />

              {this.isEditMode() ? (
                ""
              ) : (
                <Flat>
                  <Radio
                    name={this.state.employee.id}
                    inline
                    checked={this.isSalary() ? "checked" : ""}
                    onChange={this.handleRadioCheck("salary")}
                  >
                    Salary
                  </Radio>
                  <Radio
                    name={this.state.employee.id}
                    inline
                    checked={this.isSalary() ? "" : "checked"}
                    onChange={this.handleRadioCheck("hourly")}
                  >
                    Hourly
                  </Radio>
                </Flat>
              )}
            </FormGroup>
          )}
        </td>
        <td className="col-md-3">
          <div>
            <FormGroup>
              <ButtonGroup>
                <Button
                  onClick={this.showHide}
                  bsStyle={this.isEditMode() ? "warning" : "primary"}
                >
                  {this.isEditMode() ? "Edit" : "Save"}
                </Button>
                {this.isEditMode() ? (
                  ""
                ) : (
                  <Button bsStyle="danger">Delete</Button>
                )}
              </ButtonGroup>
            </FormGroup>
          </div>
        </td>
      </tr>
    );
  }
}

export default Employee;
