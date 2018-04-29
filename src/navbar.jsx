import React from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  NavItem,
  MenuItem,
  Glyphicon
} from "react-bootstrap";
import Auth from "aws-amplify";

const navigation = props => {
  return (
    <Navbar inverse collapseOnSelect staticTop fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#brand">CS631 Final Project</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#">
            Human Resources
          </NavItem>
          <NavItem eventKey={2} href="#">
            Class Management
          </NavItem>
          <NavItem eventKey={2} href="#">
            Registration
          </NavItem>
        </Nav>
        <Nav pullRight />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navigation;
