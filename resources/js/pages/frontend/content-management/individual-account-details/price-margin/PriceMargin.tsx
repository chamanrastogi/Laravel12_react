import { Link } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import { Image } from 'primereact/image';
import { useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import DnPriceUpload from './DnPriceUpload';
import MarginData from './MarginData';
import Overview from './Overview';
import PriceData from './PriceData';
import RankData from './RankData';

const videoLinks = [
    { title: 'Content Alignment - Why does it matter?', src: '#' },
    { title: 'Understand what content is most important', src: '#' },
    { title: 'Perform Content Alignment for new products', src: '#' },
    { title: 'Determine target products', src: '#' },
    { title: 'How to upload target products for a single site', src: '#' },
    { title: '9.0 & 9.1 - Bulk Target Product List Uploads', src: '#' },
    { title: 'Understanding "Primary" Categories', src: '#' },
    { title: 'Manage Content Alignment improvement', src: '#' },
    { title: 'Using the High-Level Action Report', src: '#' },
    { title: 'Using the Product Level Action Report', src: '#' },
    { title: 'Using the Action Reports', src: '#' },
    { title: 'Find Review Data for My Products', src: '#' },
    { title: 'Set Up SKU Auto Pull Management', src: '#' },
    { title: '9.1 Filter Out Unwanted SKUs', src: '#' },
    { title: 'How To Delete Target Product Lists', src: '#' },
];
const renderTooltip = (message: string) => <Tooltip id="button-tooltip">{message}</Tooltip>;
export default function PriceMargin() {
    const [activeKey, setActiveKey] = useState('overview');
    useEffect(() => {
        localStorage.setItem('apiDataFetched', 'true');
    }, []);
    return (
        <div className="border p-3">
            <Row className="d-flex justify-content-between">
                <Col md={6} className="mt-3">
                    <h2 className="pageheading">
                        <Image src="./images/icons/shopping-bag.jpg" alt="Shoping Bag" /> Amazon Pricing Data{' '}
                        <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products with 5+ publishedDate.')}>
                            <InfoIcon width={15} className="me-1" />
                        </OverlayTrigger>
                        <Image src="./images/icons/help_doc.png" className="fa" width="15" />
                        <Dropdown className="btn iconpos border-0 ps-1">
                            <Dropdown.Toggle variant="success" className="badge border-0 bg-white p-0" id="dropdown-basic">
                                <Image src="./images/icons/play.png" className="fa" width="34" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {videoLinks.map((video, index) => (
                                    <Dropdown.Item key={index} href={video.src}>
                                        {' '}
                                        {video.title}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </h2>
                </Col>
                <Col md={6} className="mt-3 text-end">
                    <Button size="sm" variant="primary" className="me-1">
                        HISTORICAL DATA
                    </Button>
                </Col>
            </Row>

            <Row className="d-flex gap-2">
                <Col>
                    <Form.Check inline name="changeFilter" id="allChanges" label="Only display Sku that you control" defaultChecked />
                    <p className="d-inline-flex">
                        <Link className="text-danger fw-bold me-2" href="#">
                            Click here
                        </Link>{' '}
                        to update this data so both Product SKUs and UPC codes are present.
                    </p>
                </Col>
            </Row>
            <Row className="justify-content-between align-items-baseline">
                <Col>
                    <div className="text-success mt-2">
                        All Active Product Data from today’s crawl, <strong>04/07/2025</strong> is published.
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Tabs activeKey={activeKey} onSelect={(k) => k && setActiveKey(k)} id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="overview" title="Overview">
                        {activeKey === 'overview' && <Overview  />}
                    </Tab>
                    <Tab eventKey="priceData" title="Price Data">
                        {activeKey === 'priceData' && <PriceData />}
                    </Tab>
                    <Tab eventKey="marginData" title="Margin Data">
                        {activeKey === 'marginData' && <MarginData   />}
                    </Tab>
                    <Tab eventKey="rankData" title="Rank Data">
                        {activeKey === 'rankData' && <RankData />}
                    </Tab>
                    <Tab eventKey="dmPriceUpload" title="DM Price Upload">
                        {activeKey === 'dmPriceUpload' && <DnPriceUpload />}
                    </Tab>
                </Tabs>
            </Row>
        </div>
    );
}
