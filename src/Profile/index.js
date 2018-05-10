import React, { Component } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import FieldGroup from "../UI/FieldGroup";
import { API, Auth } from "aws-amplify";

class Profile extends Component {
	model = {
		identity: "",
		name: "",
		addressMain: "",
		addressSecondary: "",
		city: "",
		state: "",
		zip: "",
		new: true
	};
	state = { ...this.model };
	componentDidMount() {
		Auth.currentUserInfo()
			.then(info => {
				API.get("FitnessClub", "/profile?id=" + info.username, {
					headers: {},
					response: true,
					queryStringParameters: {}
				})
					.then(response => {
						console.log(response);
						if (response.data.success) {
							if (!response.data.member) {
								let current = { ...this.model };
								current.identity = info.username;
								this.setState({ ...current });
							} else {
								this.setState({
									...response.data.member,
									new: false
								});
							}
						} else {
							let current = { ...this.model };
							current.username = info.username;
							this.setState({ ...this.model });
						}
					})
					.catch(error => {
						console.log(error.response);
					});
			})
			.catch(error => {
				console.log(error);
			});
	}
	handleGeneric = (field, e) => {
		return function(e) {
			let profile = { ...this.state };
			profile[field] = e.target.value;
			this.setState({ ...profile });
		}.bind(this);
	};
	handleSubmit = () => {
		let current = { ...this.state };
		if (current.new) {
			console.log("POST");
			console.log(current);
			Auth.currentUserInfo()
				.then(info => {
					current.identity = info.username;

					API.post("FitnessClub", "/profile", {
						headers: {},
						body: { ...current },
						response: true,
						queryStringParameters: {}
					})
						.then(response => {
							if (response.data.success) {
								window.location = window.location;
							} else {
								console.log(response);
								//alert(
								//	"POST: An unspecified error occurred. Check CloudWatch for information."
								//);
							}
						})
						.catch(error => {
							console.log(error);
						});
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			API.put("FitnessClub", "/profile", {
				headers: {},
				body: { ...current },
				response: true,
				queryStringParameters: {}
			})
				.then(response => {
					if (response.data.success) {
						window.location = window.location;
					} else {
						console.log(response);
						//alert(
						//	"PUT: An unspecified error occurred. Check CloudWatch for information."
						//);
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	};
	render = () => {
		return (
			<form>
				<FieldGroup
					id="name"
					type="text"
					label="Name"
					placeholder="John Doe"
					value={this.state.name}
					onChange={this.handleGeneric("name")}
				/>
				<FieldGroup
					id="addressMain"
					type="text"
					label="Address"
					placeholder="123 Main St"
					value={this.state.addressMain}
					onChange={this.handleGeneric("addressMain")}
				/>
				<FieldGroup
					id="addressSecondary"
					type="text"
					label="Apartment"
					placeholder="Apt A"
					value={this.state.addressSecondary}
					onChange={this.handleGeneric("addressSecondary")}
				/>
				<FieldGroup
					id="city"
					type="text"
					label="City"
					placeholder="New York City"
					value={this.state.city}
					onChange={this.handleGeneric("city")}
				/>
				<FieldGroup
					id="state"
					type="text"
					label="State"
					placeholder="New York"
					value={this.state.state}
					onChange={this.handleGeneric("state")}
				/>
				<FieldGroup
					id="zip"
					type="text"
					label="Zip"
					placeholder="10101"
					value={this.state.zip}
					onChange={this.handleGeneric("zip")}
				/>
				<Button
					bsStyle="primary"
					bsSize="large"
					onClick={() => this.handleSubmit()}
				>
					Update Profile
				</Button>
			</form>
		);
	};
}

export default Profile;
