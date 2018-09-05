import React, { Component } from "react";
import Authorization from "../HOC/Authorization";
import { Table, Modal, Button } from "react-bootstrap";
import FieldGroup from "../UI/FieldGroup";
import { API } from "aws-amplify";

class Salary extends Component {
	state = {
		items: []
	};
	constructor(props, context) {
		super(props, context);
	}
	componentDidMount() {
		API.get("FitnessClub", "/salary", {
			headers: {},
			response: true,
			queryStringParameters: {}
		})
			.then(response => {
				console.log(response);
				let current = this.state;
				current.items = [...response.data.salaries];
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
							<th>Name</th>
							<th>Paid</th>
							<th>Tax</th>
							<th>Paid Date</th>
						</tr>
					</thead>
					<tbody>
						{this.state.items.map((obj, i) => (
							<tr key={obj.instructorId}>
								<td>{obj.name}</td>
								<td>{obj.pay}</td>
								<td>{obj.tax}</td>
								<td>{obj.pay_date}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default Salary;
