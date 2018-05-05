import React, { Component } from "react";
import Authorization from "../HOC/Authorization";
import { Table, Modal, Button } from "react-bootstrap";
import FieldGroup from "../UI/FieldGroup";

class Employee extends Component {
	model = {
		name: "",
		salary: null,
		hours: 0,
		hourlyRate: 0
	};
	state = {
		show: false,
		currentEmployee: {
			...this.model
		},
		employees: []
	};
	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	showModal = (obj, index) => {
		return function() {
			let employee = { ...obj };
			if (index != null) {
				employee.index = index;
			}
			this.setState({ show: true, currentEmployee: employee });
		}.bind(this);
	};
	handleChangeName = e => {
		let employee = { ...this.state.currentEmployee };
		employee.name = e.target.value;
		this.setState({ currentEmployee: employee });
	};
	handleChangeSalary = e => {
		let employee = { ...this.state.currentEmployee };
		employee.salary = e.target.value;
		this.setState({ currentEmployee: employee });
	};
	handleChangeHours = e => {
		let employee = { ...this.state.currentEmployee };
		employee.hours = e.target.value;
		this.setState({ currentEmployee: employee });
	};
	handleChangeHourlyRate = e => {
		let employee = { ...this.state.currentEmployee };
		employee.hourlyRate = e.target.value;
		this.setState({ currentEmployee: employee });
	};
	handleCallback = () => {
		let current = { ...this.state };
		if (current.currentEmployee.index == null) {
			let employees = [...current.employees];
			employees.push(current.currentEmployee);
			this.setState({ show: false, employees: employees });
		} else {
			current.employees[current.currentEmployee.index] = {
				...current.currentEmployee
			};
			this.setState({ show: false, employees: current.employees });
		}
	};

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}
	componentDidMount() {
		// TEST
		let current = { ...this.state };
		current.employees.push(
			{
				id: 1,
				name: "Johnny Bravo",
				salary: null,
				hours: 40,
				hourlyRate: 15
			},
			{
				salary: 125000.5,
				id: 2,
				hours: null,
				hourlyRate: null
			}
		);
		this.setState(current);
		// END TEST
	}
	render() {
		return (
			<div>
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Payment</th>
						</tr>
					</thead>
					<tbody>
						{this.state.employees.map((obj, i) => (
							<tr key={i} onClick={this.showModal(obj, i)}>
								<td>{obj.id}</td>
								<td>{obj.name}</td>
								<td>{obj.salary}</td>
							</tr>
						))}

						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>
									{this.state.currentEmployee.name}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<form>
									<FieldGroup
										id="name"
										type="text"
										label="Employee Name"
										placeholder="Ricky Bobby"
										value={this.state.currentEmployee.name}
										onChange={this.handleChangeName}
									/>
									<FieldGroup
										id="salary"
										type="number"
										label="Salary"
										placeholder="123456.78"
										value={
											this.state.currentEmployee.salary
										}
										onChange={this.handleChangeSalary}
									/>
									<FieldGroup
										id="hours"
										type="number"
										label="Hours"
										placeholder="40"
										value={this.state.currentEmployee.hours}
										onChange={this.handleChangeHours}
									/>
									<FieldGroup
										id="hourlyRate"
										type="number"
										label="Hourly Rate"
										placeholder="40"
										value={
											this.state.currentEmployee
												.hourlyRate
										}
										onChange={this.handleChangeHourlyRate}
									/>
								</form>
							</Modal.Body>
							<Modal.Footer>
								<Button
									bsStyle="primary"
									bsSize="large"
									onClick={() => this.handleCallback()}
								>
									Save
								</Button>
								<Button
									bsStyle="danger"
									bsSize="large"
									onClick={this.handleClose}
								>
									Delete
								</Button>
								<Button
									bsSize="large"
									onClick={this.handleClose}
								>
									Close
								</Button>
							</Modal.Footer>
						</Modal>
					</tbody>
				</Table>
				<Button
					bsStyle="primary"
					bsSize="large"
					onClick={this.showModal(this.model, null)}
				>
					New Employee
				</Button>
			</div>
		);
	}
}

export default Employee;
