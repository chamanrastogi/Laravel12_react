
import { Container, Button } from "react-bootstrap";


export default function NotFound  ()  {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-3">Page Not Found</h2>
            <p className="text-muted">
                Sorry, the page you are looking for does not exist.
            </p>
            <Button as="a" href="/" variant="primary" className="mt-3">
                Go to Home
            </Button>
        </Container>
    );
};

