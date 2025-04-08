import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Image } from 'primereact/image';
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
} from 'react-bootstrap';

import AppFrontAuthLayout from '@/layouts/front-auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppFrontAuthLayout>
            <Head title="Reset Password" />
            <div className="login-card">
                <Container className="d-flex justify-content-center align-items-center">
                    <Row className="w-100">
                        <div className="d-flex justify-content-center align-items-center pb-3">
                            <Image src="/images/logo.png" />
                        </div>
                        <Col md={6} className="login-main mx-auto">
                            <div className="mb-4 text-center">
                                <h2>Reset your password</h2>
                                <p className="text-muted">Please enter your new password below.</p>
                            </div>

                            <Form onSubmit={submit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="email"
                                            value={data.email}
                                            readOnly
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>New Password</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="password"
                                            placeholder="Password"
                                            required
                                            name="password"
                                            autoFocus
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="password_confirmation">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="password"
                                            placeholder="Confirm password"
                                            required
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.password_confirmation && (
                                        <small className="text-danger">{errors.password_confirmation}</small>
                                    )}
                                </Form.Group>

                                <Button type="submit" variant="primary" className="w-100" disabled={processing}>
                                    {processing && <span className="spinner-border spinner-border-sm me-2" />}
                                    Reset password
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </AppFrontAuthLayout>
    );
}
