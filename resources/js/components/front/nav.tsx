import { Navbar, Nav, NavDropdown, Container, Button, Image } from "react-bootstrap";
import { Link } from "@inertiajs/react";

export default function NavBar() {
    return (
        <div>
            {/* Top Navbar */}
            <Navbar bg="light" variant="light" className="shadow-sm px-3 py-2">
                <Container className="d-flex justify-content-between">
                    {/* Logo */}
                    <span className="flex d-flex" id="logo">
                        <Link href="/table">
                            <Image src="/images/logo.png" alt="mySamm Logo"  />
                            </Link>

                    <span className="version mt-4">10.0 beta</span>
                    </span>
                    {/* User Actions */}
                    <div className="d-flex align-items-center gap-2">
                        <span>Welcome, <strong>Demo-Account</strong></span>
                        <Button variant="outline-secondary" size="sm"><i className="fa fa-star"></i></Button>
                        <Button variant="outline-secondary" size="sm"><i className="fa fa-user"></i></Button>
                        <Button variant="outline-secondary" size="sm"><i className="fa fa-question"></i></Button>
                        <Button variant="outline-secondary" size="sm"><i className="fa fa-cog"></i></Button>
                    </div>
                </Container>
            </Navbar>

            {/* Main Navigation */}
            <Navbar bg="primary" className="p-0" variant="dark" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="navbarNavDropdown" />
                    <Navbar.Collapse id="navbarNavDropdown">
                        <Nav className="me-auto">
                            <NavDropdown title="Price & Seller Tracker" id="priceTracker">
                                <NavDropdown.Item href="#">Account Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="#">Matched Accounts</NavDropdown.Item>
                                <NavDropdown.Item href="#">Unmatched Sellers</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Product Tracker" id="productTracker">
                                <NavDropdown.Item href="#">Market Share Dashboard</NavDropdown.Item>
                                <NavDropdown.Item href="#">Website Specifics</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="#">Top Seller Tracker</Nav.Link>
                            <Nav.Link href="#">Top Content Tracker</Nav.Link>
                            <Nav.Link href="#">Content Creation</Nav.Link>
                            <Nav.Link href="#">Prospect Tracker</Nav.Link>

                            <Nav.Link as={Link} href="/test" className="active">Content Management</Nav.Link>

                            <NavDropdown title="Research Trackers" id="researchTracker">
                                <NavDropdown.Item href="#">Accent Table Tracker</NavDropdown.Item>
                                <NavDropdown.Item href="#">Ceiling Fan Tracker</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
