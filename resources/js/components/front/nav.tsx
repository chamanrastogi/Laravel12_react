import { Link, usePage } from '@inertiajs/react';
import { Button, Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { type SharedData } from '@/types';

export default function NavBar() {
    const { url } = usePage();
    const { version } = usePage<SharedData>().props;
   
    return (
        <>
            {/* Top Navbar */}
            <div className="fixed-top">
                <Navbar bg="light" variant="light" className="px-0 py-2 shadow-sm">
                    <Container className="d-flex justify-content-between">
                        {/* Logo */}
                        <span className="d-flex flex" id="logo">
                            <Link href="/">
                                <Image src="/images/logo.png" alt="mySamm Logo" />
                            </Link>
                            <span className="version mt-4">{version}</span>
                        </span>
                        {/* User Actions */}
                        <div className="d-flex align-items-center gap-2">
                            <span>
                                Welcome, <strong>Demo-Account</strong>
                            </span>
                            <Button variant="outline-secondary" size="sm">
                                <i className="fa fa-star"></i>
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                                <i className="fa fa-question"></i>
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                                <i className="fa fa-cog"></i>
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                                <i className="fa fa-sign-out"></i>
                            </Button>
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

                                <Nav.Link as={Link} href="/top-seller-tracker" className={url === '/top-seller-tracker' ? 'active' : ''}>
                                    Top Seller Tracker
                                </Nav.Link>
                                <Nav.Link as={Link} href="/top-content-tracker" className={url === '/top-content-tracker' ? 'active' : ''}>
                                    Top Content Tracker
                                </Nav.Link>
                                <Nav.Link as={Link} href="/content-creation" className={url === '/content-creation' ? 'active' : ''}>
                                    Content Creation
                                </Nav.Link>
                                <Nav.Link as={Link} href="/prospect-tracker" className={url === '/prospect-tracker' ? 'active' : ''}>
                                    Prospect Tracker
                                </Nav.Link>

                                <Nav.Link as={Link} href="/content-management" className={url === '/content-management' ? 'active' : ''}>
                                    Content Management
                                </Nav.Link>

                                <NavDropdown title="Research Trackers" id="researchTracker">
                                    <NavDropdown.Item href="#">Accent Table Tracker</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Ceiling Fan Tracker</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}
