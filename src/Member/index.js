import React, { Component } from "react";
import Authorization from "../HOC/Authorization";
import { Table, Modal, Button } from "react-bootstrap";
import FieldGroup from "../UI/FieldGroup";
import { API } from "aws-amplify";

class Member extends Component {
	model = {
		identity: "",
		name: "",
		registrationDate: "",
		addressMain: "",
		addressSecondary: "",
		city: "",
		state: "",
		zip: ""
	};
	state = {
		show: false,
		currentMember: { ...this.model },
		members: []
	};
	constructor(props, context) {
		super(props, context);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	showModal = (obj, index) => {
		return function() {
			let member = { ...obj };
			if (index != null) {
				member.index = index;
			}
			this.setState({ show: true, currentMember: member });
		}.bind(this);
	};
	handleGeneric = (field, e) => {
		return function(e) {
			let member = { ...this.state.currentMember };
			member[field] = e.target.value;
			this.setState({ currentMember: member });
		}.bind(this);
	};
	handleCallback = () => {
		let current = { ...this.state };
		console.log(current.currentMember);
		API.put("FitnessClub", "/member", {
			headers: {},
			body: { ...current.currentMember },
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
	};

	handleDelete() {
		let current = { ...this.state };
		API.del("FitnessClub", "/member", {
			headers: {},
			body: { ...current.currentMember },
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
		API.get("FitnessClub", "/member", {
			headers: {},
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				console.log(response);
				let current = this.state;
				current.members = [...response.data.members];
				this.setState({ ...current });
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
							<th>Name</th>
							<th>Address Main</th>
							<th>Address Secondary</th>
							<th>City</th>
							<th>State</th>
							<th>Zip</th>
						</tr>
					</thead>
					<tbody>
						{this.state.members.map((obj, i) => (
							<tr key={i} onClick={this.showModal(obj, i)}>
								<td>{obj.identity}</td>
								<td>{obj.name}</td>
								<td>{obj.addressMain}</td>
								<td>{obj.addressSecondary}</td>
								<td>{obj.city}</td>
								<td>{obj.state}</td>
								<td>{obj.zip}</td>
							</tr>
						))}

						<Modal show={this.state.show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>
									{this.state.currentMember.name}
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<form>
									<FieldGroup
										id="name"
										type="text"
										label="Name"
										placeholder="Ricky Bobby"
										value={this.state.currentMember.name}
										onChange={this.handleGeneric("name")}
									/>
									<FieldGroup
										id="addressMain"
										type="text"
										label="Address"
										placeholder="123 Main St"
										value={
											this.state.currentMember.addressMain
										}
										onChange={this.handleGeneric(
											"addressMain"
										)}
									/>
									<FieldGroup
										id="addressSecondary"
										type="text"
										label="Apartment"
										placeholder="A"
										value={
											this.state.currentMember
												.addressSecondary
										}
										onChange={this.handleGeneric(
											"addressSecondary"
										)}
									/>
									<FieldGroup
										id="city"
										type="text"
										label="City"
										placeholder="Newark"
										value={this.state.currentMember.city}
										onChange={this.handleGeneric("city")}
									/>
									<FieldGroup
										id="state"
										type="text"
										label="State"
										placeholder="NJ"
										value={this.state.currentMember.state}
										onChange={this.handleGeneric("state")}
									/>
									<FieldGroup
										id="zip"
										type="text"
										label="Zip"
										placeholder="Zipcode"
										value={this.state.currentMember.zip}
										onChange={this.handleGeneric("zip")}
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
								{this.state.currentMember.memberId != null ? (
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
			</div>
		);
	}
}

export default Member;
