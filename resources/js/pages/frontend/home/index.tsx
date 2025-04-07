import AppFrontLayout from '@/layouts/front-layout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Button, Container } from 'react-bootstrap';

export default function Index() {
    const { auth } = usePage<SharedData>().props;
    return (
        <AppFrontLayout>
            <Head title="Home Page" />
            <Container className="d-flex flex-column justify-content-center align-items-center mt-5 text-center">
                <h1 className="display-1 fw-bold text-danger">Home</h1>
                <h2 className="mb-3">Welcome to Mysamm  {auth.user.name} </h2>

                <Button as="a" href="/content-management" variant="primary" className="mt-3">
                    Go to Content Management
                </Button>
            </Container>
        </AppFrontLayout>
    );
}
