import AppFrontLayout from '@/layouts/front-layout';
import { Head } from '@inertiajs/react';
import { Button, Container } from 'react-bootstrap';

export default function NotFound() {
    return (
        <AppFrontLayout>
            <Head title="Page Not Found" />
            <Container className="d-flex flex-column justify-content-center align-items-center mt-5 text-center">
                <h1 className="display-1 fw-bold text-danger">404</h1>
                <h2 className="mb-3">Page Not Found</h2>
                <p className="text-muted">Sorry, the page you are looking for does not exist.</p>
                <Button as="a" href="/" variant="primary" className="mt-3">
                    Go to Home
                </Button>
            </Container>
        </AppFrontLayout>
    );
}
