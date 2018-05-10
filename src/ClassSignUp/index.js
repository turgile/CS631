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
import { API, Auth } from "aws-amplify";

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
		member: {},
		classes: [],
		classmember: [],
		instructors: [],
		exercises: [],
		rooms: []
	};
	constructor(props, context) {
		super(props, context);
	}
	handleCallback = classId => {
		console.log(classId);
		let current = { ...this.state.member };
		console.log(current);
		API.post("FitnessClub", "/classmember", {
			headers: {},
			body: {
				memberId: current.key,
				classId: classId
			},
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
				let current = { ...this.state };
				current.show = false;
				this.setState(current);
				console.log(error.response);
			});
	};
	handleDelete = classId => {
		console.log(classId);
		let current = { ...this.state.member };
		API.del("FitnessClub", "/classmember", {
			headers: {},
			body: { memberId: current.key, classId: classId },
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
	};
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
						this.setState({ member: { ...response.data.member } });
					})
					.catch(error => {
						console.log(error);
					});
			})
			.catch(error => {
				console.log(error);
			});
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
				this.setState({ classes: [...response.data.classes] });
			})
			.catch(error => {
				console.log(error.response);
			});
		API.get("FitnessClub", "/classmember", {
			headers: {},
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				console.log(response);
				this.setState({ classmember: [...response.data.classMembers] });
			})
			.catch(error => {
				console.log(error.response);
			});
	}
	renderButton = classId => {
		let check = false;
		let button = {};
		this.state.classmember.map(inner => {
			if (
				inner.memberId == this.state.member.key &&
				classId == inner.classId
			) {
				check = true;
			}
		});
		if (check) {
			button = (
				<Button
					key={classId}
					bsStyle="danger"
					bsSize="small"
					onClick={() => {
						return this.handleDelete(classId);
					}}
				>
					Remove Me!
				</Button>
			);
		} else {
			button = (
				<Button
					key={classId}
					bsStyle="primary"
					bsSize="small"
					onClick={() => {
						return this.handleCallback(classId);
					}}
				>
					Sign Me Up!
				</Button>
			);
		}
		return button;
	};
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
							<th>Exercises</th>
							<th>Room</th>
							<th>Instructor</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{this.state.classes.map((obj, i) => (
							<tr key={obj.classId}>
								<td>{obj.classId}</td>
								<td>{obj.startDateTime}</td>
								<td>{obj.duration}</td>
								<td>{obj.capacity}</td>
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
								<td>{this.renderButton(obj.classId)}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default Class;
