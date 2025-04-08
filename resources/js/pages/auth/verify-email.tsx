import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Image } from 'primereact/image';
import {
    Button,
    Col,
    Container,
    Form,
    Row,
    Alert,
} from 'react-bootstrap';

import AppFrontAuthLayout from '@/layouts/front-auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AppFrontAuthLayout>
            <Head title="Verify Email" />

            <div className="login-card">
                <Container className="d-flex justify-content-center align-items-center">
                    <Row className="w-100">
                        <div className="d-flex justify-content-center align-items-center pb-3">
                            <Image src="/images/logo.png" />
                        </div>

                        <Col md={6} className="login-main mx-auto text-center">
                            <h2 className="mb-2">Verify your email</h2>
                            <p className="text-muted mb-4">
                                Please verify your email address by clicking the link we just emailed you.
                            </p>

                            {status === 'verification-link-sent' && (
                                <Alert variant="success">
                                    A new verification link has been sent to the email address you provided during registration.
                                </Alert>
                            )}

                            <Form onSubmit={submit}>
                                <div className="d-grid mb-3">
                                    <Button type="submit" variant="secondary" disabled={processing}>
                                        {processing && <span className="spinner-border spinner-border-sm me-2" />}
                                        Resend verification email
                                    </Button>
                                </div>

                                <Form.Text className="text-muted">
                                    <a
                                        href={route('logout')}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            post(route('logout'));
                                        }}
                                        className="text-decoration-none"
                                    >
                                        Log out
                                    </a>
                                </Form.Text>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </AppFrontAuthLayout>
    );
}
