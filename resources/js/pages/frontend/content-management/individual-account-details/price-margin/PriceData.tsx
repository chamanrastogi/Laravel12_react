
import { InfoIcon } from 'lucide-react';
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
const renderTooltip = (message: string) => <Tooltip id="button-tooltip">{message}</Tooltip>;
export default function PriceData ()  {
    return (
        <>
            <Row>
                <Col className="col-auto">
                    <Form.Label className="fw-bold me-1">Search: <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products with 5+ publishedDate.')}>
                            <InfoIcon width={15} className="me-1 seach" />
                        </OverlayTrigger></Form.Label>
                    <Form.Control size="sm" className="d-inline-block w-auto" type="text" placeholder="Search..." />
                </Col>
                <Col className="align-self-center ms-4">
                    <span className="">
                        <Form.Check
                            inline
                            name="changeFilter"
                            id="allChanges"
                            label="Only display listings of seller who has the buy box today"
                            defaultChecked
                        />
                       
                    </span>
                </Col>
                <Col className="text-end">
                    <Button>Download</Button>
                </Col>
            </Row>
        </>
    );
};

