import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/userReducer";

const TopBar = () => {

    // redux states
    const user = useSelector(({user}) => user)
    const dispatch = useDispatch()

    // handle log out
    const handleLogout = () => {
        dispatch(userLogout())
    }

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/">Boston-Main-Streets</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/">Map</Nav.Link>
                        <Nav.Link href="/">Upload</Nav.Link>
                        {
                            user
                                ? (
                                    <NavDropdown title={`Hi, ${user.email}`} className="mr-auto">
                                        <NavDropdown.Item onClick={() => handleLogout()}>
                                            Log Out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )
                                : <Nav.Link href="/login">Log In</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopBar