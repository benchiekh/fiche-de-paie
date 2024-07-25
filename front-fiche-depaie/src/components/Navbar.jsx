// src/components/Navbar.jsx
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Navbar.css';

const CustomNavbar = () => {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Mon Projet</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto navbar-nav">
          <LinkContainer to="/dashboard">
            <Nav.Link>
              <i className="bi bi-speedometer2"></i> Dashboard
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/payslips">
            <Nav.Link>
              <i className="bi bi-receipt"></i> Fiche de paie
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/employees">
            <Nav.Link>
              <i className="bi bi-people"></i> Employees
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/contacts">
            <Nav.Link>
              <i className="bi bi-person-lines-fill"></i> Contacts
            </Nav.Link>
          </LinkContainer>
         
          <NavDropdown title="More" id="basic-nav-dropdown">
            <LinkContainer to="/settings">
              <NavDropdown.Item>
                <i className="bi bi-gear"></i> Settings
              </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/logout">
              <NavDropdown.Item>
                <i className="bi bi-box-arrow-right"></i> Logout
              </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
