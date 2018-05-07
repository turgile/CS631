import React, { Component } from "react";
import { API } from "aws-amplify";
import Authorization from "../HOC/Authorization";
import { Table, Modal, Button } from "react-bootstrap";
import FieldGroup from "../UI/FieldGroup";

class Room extends Component {
	model = {
		roomId: null,
		name: "",
		number: "",
		capacity: 0
	};
	state = {
		show: false,
		currentRoom: { ...this.model },
		rooms: []
	};
	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	showModal = (obj, index) => {
		return function() {
			let room = { ...obj };
			if (index != null) {
				room.index = index;
			}
			this.setState({ show: true, currentRoom: room });
		}.bind(this);
	};
	handleChangeRoomNumber = e => {
		let room = { ...this.state.currentRoom };
		room.number = e.target.value;
		this.setState({ currentRoom: room });
	};
	handleChangeCapacity = e => {
		let room = { ...this.state.currentRoom };
		room.capacity = Number(e.target.value);
		this.setState({ currentRoom: room });
	};
	handleChangeBuildingName = e => {
		let room = { ...this.state.currentRoom };
		room.name = e.target.value;
		this.setState({ currentRoom: room });
	};
	handleCallback = () => {
		let current = { ...this.state };
		if (current.currentRoom.index == null) {
			API.post("FitnessClub", "/room", {
				headers: {},
				body: { ...current.currentRoom },
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
		} else {
			API.put("FitnessClub", "/room", {
				headers: {},
				body: { ...current.currentRoom },
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
		API.del("FitnessClub", "/room", {
			headers: {},
			body: { ...current.currentRoom },
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				console.log(response);
				if (response.data.success) {
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
	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}
	componentDidMount() {
		API.get("FitnessClub", "/room", {
			headers: {},
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				let current = { ...this.state };
				current.rooms = [...response.data.rooms];
				this.setState(current);
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
							<th>Building Name</th>
							<th>Room Number</th>
							<th>Capacity</th>
						</tr>
					</thead>
					<tbody>
						{this.state.rooms.map((obj, i) => (
							<tr key={i} onClick={this.showModal(obj, i)}>
								<td>{obj.roomId}</td>
								<td>{obj.name}</td>
								<td>{obj.number}</td>
								<td>{obj.capacity}</td>
							</tr>
						))}

						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>
									{this.state.currentRoom.name}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<form>
									<FieldGroup
										id="name"
										type="text"
										label="Building Name"
										placeholder="Main"
										value={this.state.currentRoom.name}
										onChange={this.handleChangeBuildingName}
									/>
									<FieldGroup
										id="number"
										type="text"
										label="Room Number"
										placeholder="123"
										value={this.state.currentRoom.number}
										onChange={this.handleChangeRoomNumber}
									/>
									<FieldGroup
										id="capacity"
										type="number"
										label="Capacity"
										placeholder="121"
										value={this.state.currentRoom.capacity}
										onChange={this.handleChangeCapacity}
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
								{this.state.currentRoom.roomId != null ? (
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
					New Room
				</Button>
			</div>
		);
	}
}

export default Room;
