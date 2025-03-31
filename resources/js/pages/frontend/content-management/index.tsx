import AppFrontLayout from '@/layouts/front-layout';
import { ProductProps } from '@/types/cm';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Container, Form, OverlayTrigger, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import ProductContent from './content-management-dashboard/productContent';
import ProductNumbers from './content-management-dashboard/productNumbers';
import Account from './individual-account-details/acoount';
const websites = [
    { id: 4, name: 'Amazon' },
    { id: 20, name: 'Bed Bath & Beyond' },
    { id: 24, name: 'Build' },
    { id: 22, name: 'Home Depot' },
    { id: 39, name: 'Lighting New York' },
    { id: 17, name: 'Lowes' },
    { id: 36, name: 'Lumens' },
    { id: 16, name: 'Wayfair' },
];
const videoLinks = [
    { title: 'Content Alignment - Why does it matter?', src: '#' },
    { title: 'Understand what content is most important', src: '#' },
    { title: 'Perform Content Alignment for new products', src: '#' },
    { title: 'Determine target products', src: '#' },
    { title: 'Upload target products for a single site', src: '#' },
    { title: 'Bulk Target Product List Uploads', src: '#' },
    { title: 'Understanding Primary Categories', src: '#' },
    { title: 'Manage Content Alignment improvement', src: '#' },
    { title: 'Using the High-Level Action Report', src: '#' },
    { title: 'Using the Product Level Action Report', src: '#' },
    { title: 'Using the Action Reports', src: '#' },
    { title: 'Find Review Data for My Products', src: '#' },
    { title: 'Set Up SKU Auto Pull Management', src: '#' },
    { title: 'Filter Out Unwanted SKUs', src: '#' },
    { title: 'Delete Target Product Lists', src: '#' },
];
const renderTooltip = (message: string) => <Tooltip id="button-tooltip">{message}</Tooltip>;
export default function ContentManagement({ product: initialProduct }: ProductProps) {
    const [selectedProduct, setSelectedProduct] = useState<string>(initialProduct || 'all');

    return (
        <AppFrontLayout>
            <Head title="Content Management" />
            <Container className="mt-4">
                <h2 className="pageheading">
                    Content Management{' '}
                    <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products with 5+ publishedDate.')}>
                        <i className="fa fa-info-circle fa-1x"></i>
                    </OverlayTrigger>
                    <i className="fa fa-file fa-1x px-2"></i>
                    <Dropdown className="btn p-0">
                        <Dropdown.Toggle variant="success" className="badge border-0 bg-white" id="dropdown-basic">
                            <i className="fa fa-book text-dark fa-2x"></i>
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

                {/* Tabs Navigation */}
                <Tabs defaultActiveKey="dashboard" id="contentTabs" className="mb-3">
                    <Tab
                        eventKey="dashboard"
                        title={
                            <>
                                <i className="fa fa-tachometer-alt"></i> Content Management Dashboard
                            </>
                        }
                    >
                        <div className="position-absolute targetProduct end-0">
                            <Form.Label className="fw-bold">Select All Products Or A Target Product List:</Form.Label>
                            <Form.Select
                                className="d-inline-block mb-3 w-auto"
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                <option value="all">Display All Products</option>
                                <option value="amazon">Amazon</option>
                                <option value="wayfair">Wayfair</option>
                                <option value="lowes">Lowes</option>
                            </Form.Select>
                        </div>
                        <Tabs defaultActiveKey="productnumber" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="productnumber" title="Product Numbers">
                                <ProductNumbers product={selectedProduct} />
                            </Tab>
                            <Tab eventKey="productcontent" title="Product Content">
                                <ProductContent product={selectedProduct} />
                            </Tab>
                        </Tabs>
                    </Tab>

                    <Tab
                        eventKey="account-details"
                        title={
                            <>
                                <i className="fa fa-user"></i> Individual Account Details
                            </>
                        }
                    >
                        <div className="position-absolute targetProduct end-0">
                       
                            <Form.Select
                                className="d-inline-block mb-3 w-auto"
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                {websites.map((website, index) => (
                                    <option key={index} value="all">
                                        {website.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        <Account />
                    </Tab>

                    <Tab
                        eventKey="reporting"
                        title={
                            <>
                                <i className="fa fa-chart-line"></i> Cross-Site Historical Reporting
                            </>
                        }
                    >
                        Cross-Site Historical Reporting Content
                    </Tab>

                    <Tab
                        eventKey="sku"
                        title={
                            <>
                                <i className="fa fa-barcode"></i> Set Up SKU / Auto Pull Management
                            </>
                        }
                    >
                        Set Up SKU / Auto Pull Management Content
                    </Tab>

                    <Tab
                        eventKey="bulk-upload"
                        title={
                            <>
                                <i className="fa fa-book"></i> Bulk Target Product Upload
                            </>
                        }
                    >
                        Bulk Target Product Upload Content
                    </Tab>
                </Tabs>
            </Container>
        </AppFrontLayout>
    );
}
