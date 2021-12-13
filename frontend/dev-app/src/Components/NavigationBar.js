import React from 'react';
import { Nav, Container, NavDropdown, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar(busi_link, employ_link, spend_link) {

  // Input:  busi_link is the link to the Business page of a Main Street in the form of a string;
  //         employ_link is the link to the Employment page of a Main Street in the form of a string;
  //         spend_link is the link to the Mobility and Spending page of a Main Street in the form of a string
  // Output: A navigation bar that contains links to other Main Streets, and the current Main Street's 
  //         Business, Employment, and Mobility and Spending pages 

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#/">Homepage</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Main Streets" id="basic-nav-dropdown">
              <NavDropdown.Item href="#/brighton">Brighton</NavDropdown.Item>
              <NavDropdown.Item href="#/chinatown">Chinatown</NavDropdown.Item>
              <NavDropdown.Item href="#/washingtongateway">Washington Gateway</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href={busi_link}>Business</Nav.Link>
            <Nav.Link href={employ_link}>Employment</Nav.Link>
            <Nav.Link href={spend_link}>Mobility and Spending</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;