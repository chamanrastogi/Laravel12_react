import AppFrontLayout from '@/layouts/front-layout';
import { ProductProps } from '@/types/cm';
import { Head } from '@inertiajs/react';
import { Image } from 'primereact/image';
import { useState } from 'react';
import {  Container, Form, OverlayTrigger, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import BulkProductUpload from './bulk-target-product-upload/BulkProductUpload';

import CrossSiteHistoricalReportingContent from './cross-site-historical-reporting/CrossSiteHistoricalReportingContent';
import Account from './individual-account-details/acoount';
import SkuAutoPullSetup from './setup-sku-auto-pull-management/SkuAutoPullSetup';
import ContentManagementDashboard from './content-management-dashboard/ContentManagementDashboard';
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
const bulkvideoLinks = [
    { title: 'Content Alignment - Why does it matter?', src: '#' },
    { title: 'Understand what content is most important', src: '#' },
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
            <Container  id="contentMangement">
                <h2 className="pageheading">
                    Content Management{' '}
                    <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products with 5+ publishedDate.')}>
                        <i className="fa fa-info-circle info me-1"></i>
                    </OverlayTrigger>
                    <Image src="./images/icons/help_doc.png" className="fa" width="20" />
                    <Dropdown className="btn border-0 ps-1 iconpos">
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

                {/* Tabs Navigation */}
                <Tabs defaultActiveKey="dashboard" id="contentTabs" className="mb-1" variant="pills">
                    <Tab className="position-relative" eventKey="dashboard" title={<>Content Management Dashboard</>}>
                        <ContentManagementDashboard/>
                    </Tab>

                    <Tab className="position-relative" eventKey="account-details" title={<>Individual Account Details</>}>
                        <div className="position-absolute end-0">
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

                    <Tab eventKey="reporting" title={<>Cross-Site Historical Reporting</>}>
                        <CrossSiteHistoricalReportingContent />
                    </Tab>

                    <Tab eventKey="sku" title={<>Set Up SKU / Auto Pull Management</>}>
                        <SkuAutoPullSetup />
                    </Tab>

                    <Tab className="position-relative" eventKey="bulk-upload" title={<>Bulk Target Product Upload</>}>
                        <div className="videotargetProduct position-absolute end-0">
                            <Dropdown className="btn border-0 ps-1">
                                <Dropdown.Toggle variant="success" className="badge border-0 bg-white" id="dropdown-basic">
                                    <Image src="./images/icons/play.png" className="fa" width="34" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {bulkvideoLinks.map((video, index) => (
                                        <Dropdown.Item key={index} href={video.src}>
                                            {' '}
                                            {video.title}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <BulkProductUpload />
                    </Tab>
                </Tabs>
            </Container>
        </AppFrontLayout>
    );
}
