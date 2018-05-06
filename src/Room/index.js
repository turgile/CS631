import React, { Component } from "react";
import Authorization from "../HOC/Authorization";
import { Table, Modal, Button } from "react-bootstrap";
import FieldGroup from "../UI/FieldGroup";

class Room extends Component {
	model = {
		buildingName: "",
		roomNumber: "",
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
		room.roomNumber = e.target.value;
		this.setState({ currentRoom: room });
	};
	handleChangeCapacity = e => {
		let room = { ...this.state.currentRoom };
		room.capacity = e.target.value;
		this.setState({ currentRoom: room });
	};
	handleChangeBuildingName = e => {
		let room = { ...this.state.currentRoom };
		room.buildingName = e.target.value;
		this.setState({ currentRoom: room });
	};
	handleCallback = () => {
		let current = { ...this.state };
		if (current.currentRoom.index == null) {
			let rooms = [...current.rooms];
			rooms.push(current.currentRoom);
			this.setState({ show: false, rooms: rooms });
		} else {
			current.rooms[current.currentRoom.index] = {
				...current.currentRoom
			};
			this.setState({ show: false, rooms: current.rooms });
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
		current.rooms.push(
			{
				id: 1,
				buildingName: "Main",
				roomNumber: "1",
				capacity: 555
			},
			{
				id: 2,
				buildingName: "Library",
				roomNumber: "2",
				capacity: 125
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
							<th>Building Name</th>
							<th>Room Number</th>
							<th>Capacity</th>
						</tr>
					</thead>
					<tbody>
						{this.state.rooms.map((obj, i) => (
							<tr key={i} onClick={this.showModal(obj, i)}>
								<td>{obj.id}</td>
								<td>{obj.buildingName}</td>
								<td>{obj.roomNumber}</td>
								<td>{obj.capacity}</td>
							</tr>
						))}

						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>
									{this.state.currentRoom.type}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<form>
									<FieldGroup
										id="name"
										type="text"
										label="Building Name"
										placeholder="Main"
										value={
											this.state.currentRoom.buildingName
										}
										onChange={this.handleChangeBuildingName}
									/>
									<FieldGroup
										id="number"
										type="number"
										label="Room Number"
										placeholder="123"
										value={
											this.state.currentRoom.roomNumber
										}
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
					New Room
				</Button>
			</div>
		);
	}
}

export default Room;
