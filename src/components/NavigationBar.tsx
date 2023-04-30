import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

class NavigationBar extends React.Component {
    render(): React.ReactNode {
        return (
            <Navbar sticky="top" bg="primary" variant="dark" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Paul Flight System</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            
                            <LinkContainer to="/flights">
                                <Nav.Link>View Flights</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/flightsAdd">
                                <Nav.Link>Add Flight</Nav.Link>
                            </LinkContainer>
                            
                            <LinkContainer to="/passengers">
                                <Nav.Link>View Passengers</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/passengersAdd">
                                <Nav.Link>Add Passenger</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/passengersBook">
                                <Nav.Link>Book a Ticket</Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default NavigationBar;