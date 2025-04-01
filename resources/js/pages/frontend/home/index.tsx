import AppFrontAuthLayout from '@/layouts/front-auth-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Image } from 'primereact/image';
import { FormEventHandler } from 'react';
import { Alert, Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const Login: React.FC<LoginProps> = ({ status }) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('loginfn'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AppFrontAuthLayout>
            <Head title="Log in" />
            <div className="login-card">
                <Container className="d-flex justify-content-center align-items-center">
                    <Row className="w-100">
                      <div className='d-flex justify-content-center align-items-center pb-3'> <Image src="/images/logo.png"/></div>
                        <Col md={6} className="login-main mx-auto">
                            <div className="mb-4 text-center">
                                <h2>Sign in to account</h2>
                                <p className="text-muted">Enter your email & password to login</p>
                            </div>

                            {status && <Alert variant="success">{status}</Alert>}

                            <Form onSubmit={handleSubmit}>
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
                                        />
                                    </InputGroup>
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
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
                                        />
                                    </InputGroup>
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                </Form.Group>

                                {processing}
                                <Button type="submit" variant="primary" className="w-100" disabled={processing}>
                                    {processing && <span className="spinner-border spinner-border-sm me-2" />}
                                    Log in
                                </Button>
                            </Form>

                            <div className="mt-3 text-center">
                                <span className="text-muted">Don't have an account? </span>
                                <Link href="/register" className="small">
                                    Sign up
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </AppFrontAuthLayout>
    );
};

export default Login;
