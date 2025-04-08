import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Image } from 'primereact/image';
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
} from 'react-bootstrap';

import AppFrontAuthLayout from '@/layouts/front-auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AppFrontAuthLayout>
            <Head title="Forgot Password" />
            <div className="login-card">
                <Container className="d-flex justify-content-center align-items-center">
                    <Row className="w-100">
                        <div className="d-flex justify-content-center align-items-center pb-3">
                            <Image src="/images/logo.png" />
                        </div>
                        <Col md={6} className="login-main mx-auto">
                            <div className="mb-4 text-center">
                                <h2>Forgot your password?</h2>
                                <p className="text-muted">
                                    Enter your email and we’ll send you a reset link.
                                </p>
                            </div>

                            {status && (
                                <Alert variant="success" className="text-center">
                                    {status}
                                </Alert>
                            )}

                            <Form onSubmit={submit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="email"
                                            placeholder="email@example.com"
                                            required
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={processing}
                                            autoFocus
                                        />
                                    </InputGroup>
                                    {errors.email && (
                                        <small className="text-danger">{errors.email}</small>
                                    )}
                                </Form.Group>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-100"
                                    disabled={processing}
                                >
                                    {processing && (
                                        <span className="spinner-border spinner-border-sm me-2" />
                                    )}
                                    Email password reset link
                                </Button>
                            </Form>

                            <div className="mt-3 text-center">
                                <span className="text-muted">Remember your password? </span>
                                <a href={route('login')} className="small">
                                    Log in
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </AppFrontAuthLayout>
    );
}
