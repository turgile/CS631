import React, { Component } from "react";
import { API } from "aws-amplify";
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
			membershipId: null,
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
		membership.fee = Number(e.target.value);
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
			let advantages = current.currentMembership.advantages.split(",");
			current.currentMembership.advantages = [...advantages];

			API.post("FitnessClub", "/membership", {
				headers: {},
				body: { ...current.currentMembership },
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
			API.put("FitnessClub", "/membership", {
				headers: {},
				body: { ...current.currentMembership },
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
		API.del("FitnessClub", "/membership", {
			headers: {},
			body: { ...current.currentMembership },
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
		API.get("FitnessClub", "/membership", {
			headers: {},
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				let current = { ...this.state };
				current.memberships = [...response.data.memberships];
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
							<th>Type</th>
							<th>Advantages</th>
							<th>Fee</th>
						</tr>
					</thead>
					<tbody>
						{this.state.memberships.map((obj, i) => (
							<tr key={i} onClick={this.showModal(obj, i)}>
								<td>{obj.membershipId}</td>
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
								{this.state.currentMembership.membershipId !=
								null ? (
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
					New Membership
				</Button>
			</div>
		);
	}
}

export default Membership;
