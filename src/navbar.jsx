import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Authorization from "./HOC/Authorization";

const navigation = props => {
	return (
		<Navbar inverse collapseOnSelect staticTop fixedTop>
			<Navbar.Header>
				<Navbar.Brand>
					<Link to="/">CS631 Final Project</Link>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<Authorization group="human-resources">
						<NavItem eventKey={1} href="/employee-management">
							Employees
						</NavItem>
					</Authorization>
					<Authorization group="class-management">
						<NavItem eventKey={1} href="/class-management">
							Class
						</NavItem>
					</Authorization>
					<Authorization group="exercise-management">
						<NavItem eventKey={1} href="/exercise-management">
							Exercise
						</NavItem>
					</Authorization>
					<Authorization group="human-resources">
						<NavItem eventKey={1} href="/membership-management">
							Membership
						</NavItem>
					</Authorization>
					<Authorization group="human-resources">
						<NavItem eventKey={1} href="/member-management">
							Member
						</NavItem>
					</Authorization>
					<Authorization group="human-resources">
						<NavItem eventKey={1} href="/room-management">
							Room
						</NavItem>
					</Authorization>
				</Nav>
				<Nav pullRight />
			</Navbar.Collapse>
		</Navbar>
	);
};

export default navigation;
