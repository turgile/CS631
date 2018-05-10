import React, { Component } from "react";
import Authorization from "../HOC/Authorization";
import {
	Table,
	Modal,
	Button,
	FormGroup,
	ControlLabel,
	FormControl
} from "react-bootstrap";
import FieldGroup from "../UI/FieldGroup";
import { API } from "aws-amplify";

class Class extends Component {
	model = {
		classId: null,
		capacity: "",
		duration: "",
		startDateTime: "",
		instructor: {},
		exercises: [],
		room: {},
		index: null
	};
	state = {
		show: false,
		currentClass: {
			...this.model
		},
		classes: [],
		instructors: [],
		exercises: [],
		rooms: []
	};
	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	handleGeneric = (field, e) => {
		return function(e) {
			let clazz = { ...this.state.currentClass };
			clazz[field] = e.target.value;
			this.setState({ currentClass: clazz });
		}.bind(this);
	};
	showModal = (obj, index) => {
		return function() {
			let clazz = { ...obj };
			if (index != null) {
				clazz.index = index;
			}
			this.setState({ show: true, currentClass: clazz });
		}.bind(this);
	};
	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}
	handleCallback = () => {
		let current = { ...this.state };
		if (current.currentClass.index == null) {
			console.log(current.currentClass);
			API.post("FitnessClub", "/class", {
				headers: {},
				body: { ...current.currentClass },
				response: true,
				queryStringParameters: {}
			})
				.then(response => {
					if (response.data.success) {
						window.location = window.location;
					} else {
						console.log(response);
						/*alert(
							"An unspecified error occurred. Check CloudWatch for information."
						);*/
					}
				})
				.catch(error => {
					let current = { ...this.state };
					current.show = false;
					this.setState(current);
					console.log(error.response);
				});
		} else {
			API.put("FitnessClub", "/class", {
				headers: {},
				body: { ...current.currentClass },
				response: true,
				queryStringParameters: {}
			})
				.then(response => {
					if (response.data.success) {
						window.location = window.location;
					} else {
						alert(
							"An unspecified error occurred. Check CloudWatch for information."
						);
					}
				})
				.catch(error => {
					let current = { ...this.state };
					current.show = false;
					this.setState(current);
					console.log(error.response);
				});
		}
	};
	handleDelete() {
		let current = { ...this.state };
		API.del("FitnessClub", "/class", {
			headers: {},
			body: { ...current.currentClass },
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				console.log(response);
				//if (response.data.success) {
				if (response.data.message == "Success.") {
					// temporary hopefully
					window.location = window.location;
				} else {
					alert(
						"An unspecified error occurred. Check CloudWatch for information."
					);
				}
			})
			.catch(error => {
				console.log(error.response);
			});
	}
	componentDidMount() {
		API.get("FitnessClub", "/exercise", {
			headers: {},
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				this.setState({ exercises: [...response.data.exercises] });
			})
			.catch(error => {
				console.log(error.response);
			});
		API.get("FitnessClub", "/room", {
			headers: {},
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				this.setState({ rooms: [...response.data.rooms] });
			})
			.catch(error => {
				console.log(error.response);
			});
		API.get("FitnessClub", "/employee", {
			headers: {},
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				this.setState({ instructors: [...response.data.employees] });
			})
			.catch(error => {
				console.log(error.response);
			});
		API.get("FitnessClub", "/class", {
			headers: {},
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				console.log(response);
				this.setState({ classes: [...response.data.classes] });
			})
			.catch(error => {
				console.log(error.response);
			});
	}
	render() {
		return (
			<div>
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Id</th>
							<th>Start Date</th>
							<th>Duration</th>
							<th>Capacity</th>
							<th>Members</th>
							<th>Exercises</th>
							<th>Room</th>
							<th>Instructor</th>
						</tr>
					</thead>
					<tbody>
						{this.state.classes.map((obj, i) => (
							<tr
								key={obj.classId}
								onClick={this.showModal(obj, i)}
							>
								<td>{obj.classId}</td>
								<td>{obj.startDateTime}</td>
								<td>{obj.duration}</td>
								<td>{obj.capacity}</td>
								<td>{obj.members}</td>
								<td>{obj.exercises}</td>
								<td>
									{this.state.rooms.map(ins => {
										return ins.roomId == obj.roomId ? (
											<span
												fontWeight="bold"
												key={ins.roomId}
											>
												{ins.name}
											</span>
										) : null;
									})}
								</td>
								<td>
									{this.state.instructors.map(ins => {
										return ins.employeeId ==
											obj.instructorId ? (
											<span
												fontWeight="bold"
												key={ins.employeeId}
											>
												{ins.name}
											</span>
										) : null;
									})}
								</td>
							</tr>
						))}

						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>
									{this.state.currentClass.id}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<form>
									<FormGroup controlId="formControlsSelect">
										<ControlLabel>Exercises</ControlLabel>
										<FormControl
											componentClass="select"
											placeholder="select"
											multiple
										>
											{this.state.exercises.map(obj => {
												return (
													<option value={obj.name}>
														{obj.name}
													</option>
												);
											})}
										</FormControl>
									</FormGroup>
									<FormGroup controlId="formControlsSelect">
										<ControlLabel>Instructor</ControlLabel>
										<FormControl
											componentClass="select"
											placeholder="select"
										>
											{this.state.instructors.map(obj => {
												return this.state.currentClass
													.instructorId ==
													obj.employeeId ? (
													<option
														key={obj.employeeId}
														value={obj.name}
														selected
													>
														{obj.name}
													</option>
												) : (
													<option
														key={obj.employeeId}
														value={obj.name}
													>
														{obj.name}
													</option>
												);
											})}
										</FormControl>
									</FormGroup>
									<FormGroup controlId="formControlsSelect">
										<ControlLabel>Room</ControlLabel>
										<FormControl
											componentClass="select"
											placeholder="select"
										>
											{this.state.rooms.map(obj => {
												return this.state.currentClass
													.roomId == obj.roomId ? (
													<option
														key={obj.roomId}
														value={obj.roomId}
														selected
													>
														{obj.name}
													</option>
												) : (
													<option
														key={obj.roomId}
														value={obj.roomId}
													>
														{obj.name}
													</option>
												);
											})}
										</FormControl>
									</FormGroup>
									<FieldGroup
										id="duration"
										type="number"
										label="Duration (minutes)"
										placeholder="30"
										value={this.state.currentClass.duration}
										onChange={this.handleGeneric(
											"duration"
										)}
									/>
									<FieldGroup
										id="startDateTime"
										type="date"
										label="Start Date Time"
										placeholder="05/09/2018"
										value={
											this.state.currentClass
												.startDateTime
										}
										onChange={this.handleGeneric(
											"startDateTime"
										)}
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
								{this.state.currentClass.classId != null ? (
									<Button
										bsStyle="danger"
										bsSize="large"
										onClick={() => this.handleDelete()}
									>
										Delete
									</Button>
								) : null}
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
					New Class
				</Button>
			</div>
		);
	}
}

export default Class;
