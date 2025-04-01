import AppFrontLayout from '@/layouts/front-layout';
import { Head } from '@inertiajs/react';
import { Container } from 'react-bootstrap';

export default function Index() {
    return (
        <AppFrontLayout>
            <Head title="Home" />
            <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
                <h1 className="display-1 fw-bold text-danger">Home Page</h1>
                <h2 className="mb-3">Welcome to mysammsecure</h2>
            </Container>
        </AppFrontLayout>
    );
}
