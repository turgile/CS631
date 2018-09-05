import React from "react";
import {
	Navbar,
	Nav,
	NavItem,
	Glyphicon,
	NavDropdown,
	MenuItem
} from "react-bootstrap";
import { Auth } from "aws-amplify";
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
						<NavDropdown id="1" eventKey={1} title="Management">
							<MenuItem
								id="1"
								eventKey={1.1}
								href="/management/employee"
							>
								Employees
							</MenuItem>
							<MenuItem
								id="2"
								eventKey={1.2}
								href="/management/class"
							>
								Class
							</MenuItem>
							<MenuItem
								id="3"
								eventKey={1.3}
								href="/management/exercise"
							>
								Exercise
							</MenuItem>
							<MenuItem
								id="4"
								eventKey={1.4}
								href="/management/membership"
							>
								Membership
							</MenuItem>
							<MenuItem
								id="5"
								eventKey={1.5}
								href="/management/member"
							>
								Member
							</MenuItem>
							<MenuItem
								id="6"
								eventKey={1.6}
								href="/management/room"
							>
								Room
							</MenuItem>
							<MenuItem divider />
							<MenuItem
								id="6"
								eventKey={1.7}
								href="/reports/salary"
							>
								Salary History
							</MenuItem>
						</NavDropdown>
					</Authorization>
					<NavItem eventKey={2} href="/class">
						<Glyphicon glyph="glyphicon glyphicon-calendar" /> Class
					</NavItem>
				</Nav>
				<Nav pullRight>
					<NavDropdown id="1" eventKey={4} title="Account">
						<MenuItem id="2" eventKey={2.1} href="/profile">
							<Glyphicon glyph="glyphicon glyphicon-user" />{" "}
							Profile
						</MenuItem>
						<MenuItem
							id="3"
							eventKey={2.2}
							onClick={() => {
								Auth.signOut()
									.then(
										data =>
											(window.location = window.location)
									)
									.catch(err => console.log(err));
							}}
						>
							<Glyphicon glyph="glyphicon glyphicon-log-out" />{" "}
							Sign Out
						</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default navigation;
