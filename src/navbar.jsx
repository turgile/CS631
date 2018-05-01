import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

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
          <NavItem eventKey={1} href="/human-resources">
            Human Resources
          </NavItem>
          <NavItem eventKey={2} href="/class-management">
            Class
          </NavItem>
          <NavItem eventKey={3} href="/exercise-management">
            Exercise
          </NavItem>
        </Nav>
        <Nav pullRight />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navigation;
