import { Button, Col, Form, Row, Table } from 'react-bootstrap';

const notifications = [
    {
        name: 'Test Live Environment',
        productList: 'Display All Products',
        frequency: 'Weekly(Tuesday): Analyze',
        notificationsCount: 11,
        emails: 'keshpal@mastheadtechnologies.com',
        inactiveSKU: false,
    },
    {
        name: 'Test Live Environment !',
        productList: 'Display All Products',
        frequency: 'Weekly(Tuesday): Analyze',
        notificationsCount: 11,
        emails: 'keshpal@mastheadtechnologies.com',
        inactiveSKU: false,
    },
    {
        name: 'Test 123javascript:void',
        productList: 'Display All Products',
        frequency: 'Daily: Analyzes DOD changes',
        notificationsCount: 2,
        emails: 'keshpal.pss@gmail.com,keshpal@mastheadtechnologies.com',
        inactiveSKU: false,
    },
    {
        name: 'Sumit Lowes%s Fine No',
        productList: 'Display All Products',
        frequency: 'Daily: Analyzes DOD changes',
        notificationsCount: 3,
        emails: 'mastheadteamdata@gmail.com',
        inactiveSKU: false,
    },
    {
        name: "Test's 10% product's",
        productList: 'Display All Products',
        frequency: 'Daily: Analyzes DOD changes',
        notificationsCount: 2,
        emails: 'megha@mastheadtechnologies.com',
        inactiveSKU: false,
    },
];

export default function MySiteNotification() {
    return (
        <div className="mt-4">
            <h3>My Site Notifications</h3>
            <Table bordered striped responsive className="text-center">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Notification Name</th>
                        <th>Target Product List</th>
                        <th>Frequency</th>
                        <th># of Notifications</th>
                        <th>Email Addresses</th>
                        <th>Do not include inactive SKU's</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notif, index) => (
                        <tr key={index}>
                            <td>
                                <Form.Control size="sm" type="text" defaultValue={notif.name} />
                            </td>
                            <td>
                                <Form.Select size="sm" defaultValue={notif.productList}>
                                    <option>Display All Products</option>
                                    <option>Selected Products</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Form.Select size="sm" defaultValue={notif.frequency}>
                                    <option>Daily: Analyzes DOD changes</option>
                                    <option>Weekly(Tuesday): Analyze</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Row>
                                    <Col className="d-flex">
                                        <div className="align-self-center">{notif.notificationsCount}</div>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-secondary" size="sm" className="smallfont me-2">
                                            V
                                        </Button>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <Form.Control size="sm" type="text" defaultValue={notif.emails} />
                            </td>
                            <td className="text-center">
                                <Form.Check type="checkbox" defaultChecked={notif.inactiveSKU} />
                            </td>
                            <td>
                                <Button variant="primary" size="sm" className="smallfont me-2">
                                    SAVE
                                </Button>
                                <Button variant="primary" size="sm" className="smallfont me-2">
                                    SEND MAIL
                                </Button>
                                <Button variant="primary" size="sm" className="smallfont me-2">
                                    VIEW
                                </Button>
                                <Button variant="primary" className="smallfont" size="sm">
                                    DELETE
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="text-end">
                <Button variant="primary" size="sm" className="mt-2">
                    SAVE NOTIFICATION CHANGES
                </Button>
            </div>
        </div>
    );
}
