import React, { Component } from "react";
import Authorization from "../HOC/Authorization";
import { Table, Modal, Button } from "react-bootstrap";
import FieldGroup from "../UI/FieldGroup";

class Membership extends Component {
	model = {
		fee: 0,
		type: "",
		advantages: ""
	};
	state = {
		show: false,
		currentMembership: {
			fee: null,
			type: null,
			id: null,
			advantages: null,
			index: null
		},
		memberships: []
	};
	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	showModal = (obj, index) => {
		return function() {
			let membership = { ...obj };
			if (index != null) {
				membership.index = index;
			}
			this.setState({ show: true, currentMembership: membership });
		}.bind(this);
	};
	handleChangeFee = e => {
		let membership = { ...this.state.currentMembership };
		membership.fee = e.target.value;
		this.setState({ currentMembership: membership });
	};
	handleChangeType = e => {
		let membership = { ...this.state.currentMembership };
		membership.type = e.target.value;
		this.setState({ currentMembership: membership });
	};
	handleChangeAdvantages = e => {
		let membership = { ...this.state.currentMembership };
		membership.advantages = e.target.value;
		this.setState({ currentMembership: membership });
	};
	handleCallback = () => {
		let current = { ...this.state };
		if (current.currentMembership.index == null) {
			let memberships = [...current.memberships];
			memberships.push(current.currentMembership);
			this.setState({ show: false, memberships: memberships });
		} else {
			current.memberships[current.currentMembership.index] = {
				...current.currentMembership
			};
			this.setState({ show: false, memberships: current.memberships });
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
		current.memberships.push(
			{
				fee: 12.5,
				id: 1,
				type: "Basic",
				advantages: ["Spa", "Bar"]
			},
			{
				fee: 125.0,
				id: 2,
				type: "Advanced",
				advantages: ["Sauna", "Massage"]
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
							<th>Type</th>
							<th>Advantages</th>
							<th>Fee</th>
						</tr>
					</thead>
					<tbody>
						{this.state.memberships.map((obj, i) => (
							<tr key={i} onClick={this.showModal(obj, i)}>
								<td>{obj.id}</td>
								<td>{obj.type}</td>
								<td>{obj.advantages}</td>
								<td>{obj.fee}</td>
							</tr>
						))}

						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>
									{this.state.currentMembership.type}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<form>
									<FieldGroup
										id="type"
										type="text"
										label="Membership Type"
										placeholder="Basic"
										value={
											this.state.currentMembership.type
										}
										onChange={this.handleChangeType}
									/>
									<FieldGroup
										id="fee"
										type="number"
										label="Fee"
										placeholder="12.34"
										value={this.state.currentMembership.fee}
										onChange={this.handleChangeFee}
									/>
									<FieldGroup
										id="advantages"
										type="text"
										label="Advantages"
										placeholder="Spa,Pool,Showers"
										value={
											this.state.currentMembership
												.advantages
										}
										onChange={this.handleChangeAdvantages}
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
					New Membership
				</Button>
			</div>
		);
	}
}

export default Membership;
