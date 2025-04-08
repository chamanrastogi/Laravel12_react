import { Image } from 'primereact/image';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import "./salesimprove.css";
const videoLinks = [{ title: 'Content Alignment - Why does it matter?', src: '#' }];

export default function saleImprovement() {
    return (
        <Container fluid className="mt-1 border border-1 px-3 pt-2">
            <Row className="d-flex justify-content-start mb-4 pb-1 border-bottom">
                <Col  className="d-flex align-items-center col-3">
                    <h6 className="me-2 fw-bold mt-2">Sales Improvement Funnel:</h6>
                    <Dropdown className="iconpos">
                        <Dropdown.Toggle variant="white" className="border-0 p-0">
                            <Image src="./images/icons/play.png" className="fa" width="34" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {videoLinks.map((video, index) => (
                                <Dropdown.Item key={index} href={video.src}>
                                    {video.title}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col className="d-flex align-items-center col-7">
                    <Form.Label className="col-auto align-self pt-2 me-2 fw-bold">Select All Products Or A Target Product List:</Form.Label>
                    <Form.Select className="me-2 w-25" size="sm">
                        <option>Display All Products</option>
                    </Form.Select>
                    <Button variant="primary" size="sm" className="btn-sm smallfont col-2">
                        FIX MY CONTENT
                    </Button>
                </Col>
            </Row>

            <p>
                Optimizing sales with tier 1 websites takes both the right products and the right product management. The mySamm sales improvement
                funnel is a step-by-step process of improving your sales. Creating a green landscape and keeping it green is key to maximizing your
                sales with your top products.
            </p>
            <p>
                <a href="#" className="link-underline-light">
                    Click here
                </a>{' '}
                to create a new target product list and narrow your focus on specific products or segments.
            </p>

            {/* Product Sections */}

            <Row className="salebox mb-2 px-1">
                <Col md={4} className="box1 d-flex flex-column justify-content-center align-items-center h-100 text-center text-white">
                    <div className=" ">
                        <h5>Products Found</h5>
                        <p>Less than 75% of the products analyzed were found to be active and in-stock.</p>
                    </div>
                </Col>
                <Col md={8} className="align-self-center">
                    <p>In the Set up SKU and Auto Management tab, 7748 target products were found today.</p>
                    <p>You should strongly consider performing the following 2 steps:</p>
                    <ul className="list-unstyled fw-bold">
                        <li className="list-group-item">
                            Step 1: Confirm out-of-stock target products are accurate.{' '}
                            <a href="#" className="link-underline-light">
                                Click here to go product data tab and check both non-active and out of stock products.
                            </a>
                        </li>
                        <li className="list-group-item">
                            Step 2: Narrow your focus further and create new target product list.
                            <a href="#" className="link-underline-light">
                                Click here to create/update a target product list.
                            </a>
                        </li>
                    </ul>
                    <div className="text-danger">Note: Be sure to select a Target Product list above to narrow your focus.</div>
                </Col>
            </Row>
            <Row className="salebox mb-2 px-1">
                <Col md={4} className="box2 d-flex flex-column justify-content-center align-items-center h-100 text-center text-white">
                    <h5>Product Ranking in Categories</h5>
                    <p>Less Than 75% of the products were found to be ranking in a category (shelf).</p>
                </Col>
                <Col md={8} className="align-self-center box-content py-5">
                    <p>
                        There are currently 7748 products that were found to have an active URL (In stock or Out of Stock). This color is light green
                        because 3918 (51%) of these products were found to be ranking in a tracked category. This might need to be investigated.
                    </p>
                    <p>You should strongly consider performing the following 3 steps:</p>
                    <ul className="list-unstyled fw-bold">
                        <li className="list-group-item">
                            Step 1:
                            <a href="#" className="link-underline-light">
                                Click to confirm if any products not ranking in category are selling well. If they are selling well, there could be
                                categories not tracked where your products are found. Let your mySamm Account Manager know so they can research & add
                                new categories.
                            </a>
                        </li>
                        <li className="list-group-item">
                            Step 2: Discuss with your website account manager. If you have a relationship, send the list and ask why these are not in
                            any category.
                            <a href="#" className="link-underline-light">
                                {' '}
                                Click here to download file.
                            </a>
                        </li>
                        <li className="list-group-item">
                            Step 3: We match the product against the category it best matches and you can improve content based on the top products in
                            these categories.
                            <a href="#" className="link-underline-light">
                                {' '}
                                Click Here to fix the product content of these products.
                            </a>
                        </li>
                    </ul>
                    
                </Col>
            </Row>

            <Row className="salebox mb-2 px-1">
                <Col md={4} className="box3 d-flex flex-column justify-content-center align-items-center h-100 text-center text-white">
                    <div className=" ">
                        <h5>Product Ranking in Categories</h5>
                        <p>Less Than 75% of the products were found to be ranking in a category (shelf).</p>
                    </div>
                </Col>
                <Col md={8} className="align-self-center">
                    <p>
                        Every Tuesday we find the website category (shelf) where each of your products rank closest to 1 and then compare each
                        product’s 11 content measures against the averages of the top 100 products in the category for 11 specific measures. Last
                        Tuesday there were 4166 products analyzed. This is light red because only 3.72 measures per product were in alignment with the
                        top 100 products.{' '}
                    </p>
                    <p>You should strongly consider performing the following 3 steps:</p>
                    <ul className="list-unstyled fw-bold">
                        <li className="list-group-item">
                            Step 1: Confirm out-of-stock target products are accurate.{' '}
                            <a href="#" className="link-underline-light">
                                Click here to go product data tab and check both non-active and out of stock products.
                            </a>
                        </li>
                        <li className="list-group-item">
                            Step 2: Narrow your focus further and create new target product list.
                            <a href="#" className="link-underline-light">
                                Click here to create/update a target product list.
                            </a>
                        </li>
                    </ul>
                    
                </Col>
            </Row>
            <Row className="salebox mb-2 px-1">
                <Col md={4} className="box3 d-flex flex-column justify-content-center align-items-center h-100 text-center text-white">
                    <div className=" ">
                        <h5>Product Shipping</h5>
                        <p>
                            More than 75% of your products have a shipping time that is as equal to or faster as the products they compete against. .
                        </p>
                    </div>
                </Col>
                <Col md={8} className="align-self-center">
                    <p>
                        This past Tuesday 4166 products were found with a published shipping time. We determined if each was considered 'quick ship'
                        (meaning it arrived in less than 6 days or shipped within 2 days). We also found each product's primary category (the shelf
                        where it ranks closest to 1) and determined if the average of the top 100 prouducts was considered 'quick ship' or not. The
                        color is dark green because 3801 (91.24%) of these products were in alignment or better than the average of it's category.
                    </p>
                    <p>You should strongly consider performing the following 3 steps:</p>
                    <ul className="list-unstyled fw-bold">
                        <li className="list-group-item">
                            Step 1:
                            <a href="#" className="link-underline-light">
                                Click to view the historical performance of this target product list.
                            </a>
                        </li>
                        <li className="list-group-item">
                            Step 2:
                            <a href="#" className="link-underline-light">
                                Click here to create/update a target product list.
                            </a>
                        </li>
                        <li className="list-group-item">
                            Step 3:
                            <a href="#" className="link-underline-light">
                                Click here to view your product's and their shipping information compared against the averages of the category where
                                your product is found on site.
                            </a>
                        </li>
                    </ul>
                </Col>
            </Row>

         
        </Container>
    );
}
