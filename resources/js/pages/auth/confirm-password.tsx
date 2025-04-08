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

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AppFrontAuthLayout>
            <Head title="Confirm Password" />
            <div className="login-card">
                <Container className="d-flex justify-content-center align-items-center">
                    <Row className="w-100">
                        <div className="d-flex justify-content-center align-items-center pb-3">
                            <Image src="/images/logo.png" />
                        </div>
                        <Col md={6} className="login-main mx-auto">
                            <div className="mb-4 text-center">
                                <h2>Confirm your password</h2>
                                <p className="text-muted">
                                    This is a secure area. Please confirm your password before continuing.
                                </p>
                            </div>

                            <Form onSubmit={submit}>
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
                                            autoFocus
                                            disabled={processing}
                                        />
                                    </InputGroup>
                                    {errors.password && (
                                        <small className="text-danger">{errors.password}</small>
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
                                    Confirm password
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </AppFrontAuthLayout>
    );
}
