import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class Modaler extends Component {
	state = {
		show: false
	};
	constructor(props, context) {
		super(props, context);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}
	componentDidMount = () => {
		console.log(this.props.show);
		this.setState({ show: this.props.show });
	};
	render = () => {
		return (
			<Modal show={this.state.show} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Header</Modal.Title>
				</Modal.Header>
				<Modal.Body>Body</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => this.props.callback()}>Save</Button>
					<Button onClick={this.handleClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	};
}

export default Modaler;
