import React, { Component } from "react";
import Authorization from "../HOC/Authorization";
import { Table, Modal, Button } from "react-bootstrap";
import FieldGroup from "../UI/FieldGroup";

class Education extends Component {
	model = {
		hours: 0,
		duration: 0,
		members: [],
		exercises: [],
		room: null,
		instructor: null
	};
	state = {
		show: false,
		currentEducation: {
			...this.model
		},
		educations: []
	};
	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	showModal = (obj, index) => {
		return function() {
			let education = { ...obj };
			if (index != null) {
				education.index = index;
			}
			this.setState({ show: true, currentEducation: education });
		}.bind(this);
	};
	handleChangeName = e => {
		let education = { ...this.state.currentEducation };
		education.name = e.target.value;
		this.setState({ currentEducation: education });
	};
	handleChangeSalary = e => {
		let education = { ...this.state.currentEducation };
		education.salary = e.target.value;
		this.setState({ currentEducation: education });
	};
	handleChangeHours = e => {
		let education = { ...this.state.currentEducation };
		education.hours = e.target.value;
		this.setState({ currentEducation: education });
	};
	handleChangeHourlyRate = e => {
		let education = { ...this.state.currentEducation };
		education.hourlyRate = e.target.value;
		this.setState({ currentEducation: education });
	};
	handleCallback = () => {
		let current = { ...this.state };
		if (current.currentEducation.index == null) {
			let educations = [...current.educations];
			educations.push(current.currentEducation);
			this.setState({ show: false, educations: educations });
		} else {
			current.educations[current.currentEducation.index] = {
				...current.currentEducation
			};
			this.setState({ show: false, educations: current.educations });
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
		current.educations.push(
			{
				id: 1,
				hours: 0,
				duration: 0,
				members: [],
				exercises: [],
				room: null,
				instructor: null
			},
			{
				id: 2,
				hours: 0,
				duration: 0,
				members: [],
				exercises: [],
				room: null,
				instructor: null
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
							<th>Hours</th>
							<th>Duration</th>
							<th>Members</th>
							<th>Exercises</th>
							<th>Room</th>
							<th>Instructor</th>
						</tr>
					</thead>
					<tbody>
						{this.state.educations.map((obj, i) => (
							<tr key={i} onClick={this.showModal(obj, i)}>
								<td>{obj.id}</td>
								<td>{obj.hours}</td>
								<td>{obj.duration}</td>
								<td>{obj.members}</td>
								<td>{obj.exercises}</td>
								<td>{obj.room}</td>
								<td>{obj.instructor}</td>
							</tr>
						))}

						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>
									{this.state.currentEducation.name}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<form>
									<FieldGroup
										id="name"
										type="text"
										label="Education Name"
										placeholder="Ricky Bobby"
										value={this.state.currentEducation.name}
										onChange={this.handleChangeName}
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
					New Education
				</Button>
			</div>
		);
	}
}

export default Education;
