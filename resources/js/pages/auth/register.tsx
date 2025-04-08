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

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppFrontAuthLayout>
            <Head title="Register" />
            <div className="login-card">
                <Container className="d-flex justify-content-center align-items-center">
                    <Row className="w-100">
                        <div className="d-flex justify-content-center align-items-center pb-3">
                            <Image src="/images/logo.png" />
                        </div>
                        <Col md={6} className="login-main mx-auto">
                            <div className="mb-4 text-center">
                                <h2>Create an account</h2>
                                <p className="text-muted">Enter your details below to register</p>
                            </div>

                            <Form onSubmit={submit}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="text"
                                            placeholder="Full name"
                                            required
                                            name="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            disabled={processing}
                                        />
                                    </InputGroup>
                                    {errors.name && (
                                        <small className="text-danger">{errors.name}</small>
                                    )}
                                </Form.Group>

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
                                        />
                                    </InputGroup>
                                    {errors.email && (
                                        <small className="text-danger">{errors.email}</small>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="password"
                                            placeholder="Password"
                                            required
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            disabled={processing}
                                        />
                                    </InputGroup>
                                    {errors.password && (
                                        <small className="text-danger">{errors.password}</small>
                                    )}
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
                                            disabled={processing}
                                        />
                                    </InputGroup>
                                    {errors.password_confirmation && (
                                        <small className="text-danger">
                                            {errors.password_confirmation}
                                        </small>
                                    )}
                                </Form.Group>

                                <Button type="submit" variant="primary" className="w-100" disabled={processing}>
                                    {processing && (
                                        <span className="spinner-border spinner-border-sm me-2" />
                                    )}
                                    Create account
                                </Button>
                            </Form>

                            <div className="mt-3 text-center">
                                <span className="text-muted">Already have an account? </span>
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
