import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { API, Cache } from "aws-amplify";
import Employee from "./Employee";

class HumanResources extends Component {
  state = { employees: [] };

  parseEmployee(str, idx) {
    let employee = {};
    let tmp = str.replace("(", "");
    tmp = tmp.replace(")", "");
    tmp = tmp.split(",");
    employee.id = tmp[0].trim();
    employee.name = tmp[1].replace(/'/g, "");
    employee.salary = tmp[2].trim();
    employee.hourlyRate = tmp[3].trim();
    employee.hours = tmp[4].trim();
    return employee;
  }
  parse(str) {
    let employees = [];

    let tmp = str.replace("[", "");
    tmp = tmp.replace("]", "");
    tmp = tmp.replace(/, \(/g, "=(");
    tmp = tmp.split("=");

    for (var i = 0; i < tmp.length; i++) {
      employees.push(this.parseEmployee(tmp[i]));
    }
    Cache.setItem("employees", employees);
    this.setState({ employees: Cache.getItem("employees") });
  }
  componentDidMount() {
    let init = {
      // OPTIONAL
      headers: {}, // OPTIONAL
      response: true // OPTIONAL (return entire response object instead of response.data)
    };
    API.get("EmployeeUpdate", "/employee", init)
      .then(response => {
        //let employees = JSON.parse(response.data.body);
        this.parse(response.data.body);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th colSpan="2">Salary</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((obj, i) => (
              <Employee employee={obj} key={i} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default HumanResources;
