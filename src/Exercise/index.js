import React, { Component } from "react";
import Authorization from "../HOC/Authorization";
import { Table, Modal, Button } from "react-bootstrap";
import FieldGroup from "../UI/FieldGroup";

class Exercise extends Component {
	model = {
		name: "",
		description: ""
	};
	state = {
		show: false,
		currentExercise: {
			...this.model
		},
		exercises: []
	};
	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	showModal = (obj, index) => {
		return function() {
			let exercise = { ...obj };
			if (index != null) {
				exercise.index = index;
			}
			this.setState({ show: true, currentExercise: exercise });
		}.bind(this);
	};
	handleGeneric = (field, e) => {
		return function(e) {
			let exercise = { ...this.state.currentExercise };
			exercise[field] = e.target.value;
			this.setState({ currentExercise: exercise });
		}.bind(this);
	};
	handleCallback = () => {
		let current = { ...this.state };
		if (current.currentExercise.index == null) {
			let exercises = [...current.exercises];
			exercises.push(current.currentExercise);
			this.setState({ show: false, exercises: exercises });
		} else {
			current.exercises[current.currentExercise.index] = {
				...current.currentExercise
			};
			this.setState({ show: false, exercises: current.exercises });
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
		current.exercises.push(
			{
				id: 1,
				name: "Dead Lift",
				description: "Lift Things Up, Put Them Down"
			},
			{
				id: 2,
				name: "Not Dead Lift",
				description: "Achieve Six Pack"
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
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{this.state.exercises.map((obj, i) => (
							<tr key={i} onClick={this.showModal(obj, i)}>
								<td>{obj.id}</td>
								<td>{obj.name}</td>
								<td>{obj.description}</td>
							</tr>
						))}

						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>
									{this.state.currentExercise.name}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<form>
									<FieldGroup
										id="name"
										type="text"
										label="Exercise Name"
										placeholder="Flutter Kicks"
										value={this.state.currentExercise.name}
										onChange={this.handleGeneric("name")}
									/>
									<FieldGroup
										id="description"
										type="text"
										label="Description"
										placeholder="Test"
										value={
											this.state.currentExercise
												.description
										}
										onChange={this.handleGeneric(
											"description"
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
					New Exercise
				</Button>
			</div>
		);
	}
}

export default Exercise;
