import { Button, Container, Form, Row } from 'react-bootstrap';
export default function SetupNotifications() {
    return (
        <Container fluid className="border border-1 px-3 pt-2" id="notification">
            <h6 className="fw-bold me-2 mt-2">Set up New Email Notifications</h6>

            {/* Enter Notification Emails */}
            <Row g-3 align-items-center className="mb-2">
                <div className="align-self-center col-auto">
                    <Form.Label>
                        <strong>1) Enter Notification Email(s):</strong>
                    </Form.Label>
                </div>
                <div className="col-4 p-0">
                    <Form.Control size="sm" type="text" placeholder="" />
                </div>
                <div className="col-12">
                    <span id="passwordHelpInline" className="form-text">
                        <small className="text-danger">
                            Note: You may enter up to 4 email addresses to receive notifications. Be sure to separate email addresses with a comma
                            (,).
                        </small>
                    </span>
                </div>
            </Row>

            {/* Select Products */}
            <Row g-3 align-items-center className="mb-2">
                <div className="align-self-center col-auto">
                    <Form.Label>
                        <strong>2) Select All Products Or A Target Product List</strong>
                    </Form.Label>
                </div>
                <div className="col-auto p-0">
                    <Form.Select size="sm">
                        <option>Display All Products</option>
                    </Form.Select>
                </div>
                <div className="col-12">
                    <span id="passwordHelpInline" className="form-text">
                        <small className="text-danger">
                            Note: You may enter up to 4 email addresses to receive notifications. Be sure to separate email addresses with a comma
                            (,).
                        </small>
                    </span>
                </div>
            </Row>
            {/* Select Notification Frequency */}
            <Row g-3 align-items-center className="mb-2">
                <div className="align-self-center col-auto">
                    <Form.Label>
                        <strong>3) Select Notification Frequency</strong>
                    </Form.Label>
                </div>
                <div className="col-auto p-0">
                    <Form.Select size="sm">
                        <option value="1">Daily: Analyzes DOD changes</option>
                        <option value="2">Weekly(Tuesday): Analyzes prior 7 day changes</option>
                        <option value="3">Monthly (First Tuesday): Analyzes prior month changes</option>
                    </Form.Select>
                </div>
                <div className="col-12">
                    <span id="passwordHelpInline" className="form-text">
                        <small className="text-danger">
                            Note: You may enter up to 4 email addresses to receive notifications. Be sure to separate email addresses with a comma
                            (,).
                        </small>
                    </span>
                </div>
            </Row>

            {/* Select Notifications */}
            <Form.Group className="mb-3">
                <Form.Label>
                    <strong>4) Select Notification(s):</strong>
                </Form.Label>
                <div className="p-3">

                    <Form.Check type="checkbox" label="Do not include inactive SKU's in Notifications" />
                    <div className="ps-3">
                    <Form.Check type="checkbox" label="Products not found or out of stock" />
                    <Form.Check type="checkbox" label="Products with a change in the stock status" />
                    <Form.Check type="checkbox" label="Products without a price found" />
                    <Form.Check type="checkbox" label="Products with a price change" />
                    <Form.Check type="checkbox" label="Products without any images found" />
                    <Form.Check type="checkbox" label="Products without any videos" />
                    <Form.Check type="checkbox" label="Products with change in product name" />
                    <Form.Check type="checkbox" label="Products with a change in the # of images" />
                    <Form.Check type="checkbox" label="Products with a change in the # of videos" />
                    <Form.Check type="checkbox" label="Products with a change in the # of bullet points" />
                    <Form.Check type="checkbox" label="Products with a change in the # of words per bullet point" />
                    <Form.Check type="checkbox" label="Products with a change in the # attributes" />
                    <Form.Check type="checkbox" label="Products with a change in the # of words in romance copy" />
                    <Form.Check type="checkbox" label="Products with a change in Prime status" />
                    <Form.Check type="checkbox" label="Products with a change in their Primary Category" />
                    <Form.Check type="checkbox" label="Products with a change in their Primary Category average rank" />
                    <Form.Check type="checkbox" label="Products with a change in # of Products per PDP page" />
                    <Form.Check type="checkbox" label="Products with No Buy Box Winner (Suppressed SKU's)" />
                    <Form.Check type="checkbox" label="Products with Ship To or Arrive By Date ≥ _____ Days" />
                    </div>
                </div>
            </Form.Group>

            {/* Enter Notification Name */}

            <Row g-3 align-items-center className="mb-2">
                <div className="align-self-center col-auto">
                    <Form.Label>
                    <strong>5) Enter Notification Name:</strong>
                    </Form.Label>
                </div>
                <div className="col-4 p-0">
                <Form.Control type="text" size="sm" placeholder="Enter notification name" />
                </div>
                
            </Row>
          
            {/* Save Button */}
          <div className="text-center">  <Button variant="primary my-2 btn-sm ">SAVE NOTIFICATION</Button></div>
        </Container>
    );
}
