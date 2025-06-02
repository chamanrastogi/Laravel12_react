import AppFrontLayout from '@/layouts/front-layout';
import { Head } from '@inertiajs/react';
import { Image } from 'primereact/image';
import { useState } from 'react';
import { Container, Form, OverlayTrigger, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import BulkProductUpload from './bulk-target-product-upload/BulkProductUpload';

import { ContentManagementProps } from '@/types';
import { InfoIcon } from 'lucide-react';
import ContentManagementDashboard from './content-management-dashboard/ContentManagementDashboard';
import CrossSiteHistoricalReportingContent from './cross-site-historical-reporting/CrossSiteHistoricalReportingContent';
import Account from './individual-account-details/acoount';
import SkuAutoPullSetup from './setup-sku-auto-pull-management/SkuAutoPullSetup';

const bulkvideoLinks = [
    { title: 'Content Alignment - Why does it matter?', src: '#' },
    { title: 'Understand what content is most important', src: '#' },
];
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
export default function ContentManagement({ crawlersDisp, website_id,active_state,target }: ContentManagementProps) {
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<string>(String(website_id));
    const [activeKey, setActiveKey] = useState<string>('dashboard'); // active tab state
    return (
        <AppFrontLayout>
            <Head title="Content Management" />
            <Container fluid id="contentMangement" className="py-3">
                <h2 className="pageheading">
                    Content Management{' '} 
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

                {/* Tabs Navigation */}
                <Tabs activeKey={activeKey} onSelect={(k) => k && setActiveKey(k)} id="contentTabs" className="pb-1" variant="pills">
                    <Tab className="position-relative" eventKey="dashboard" title={<>Content Management Dashboard</>}>
                        {activeKey === 'dashboard' && <ContentManagementDashboard />}
                    </Tab>

                    <Tab className="position-relative" eventKey="account" title={<>Individual Account Details</>}>
                        <div className="position-absolute end-0">
                            <Form.Select
                                className="d-inline-block mb-3 w-auto"
                                size="sm"
                                value={selectedWebsiteId}
                                onChange={(e) => setSelectedWebsiteId(e.target.value)}
                            >
                                {Object.entries(crawlersDisp).map(([id, name]) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        {activeKey === 'account' && (
                            <Account
                                webId={selectedWebsiteId} // Pass the key (ID)
                                webName={crawlersDisp[selectedWebsiteId]} // Pass the value (Display Name)
                                active_state={String(active_state)}  // Pass the value (Active State or Product status)
                                target={target}
                            />
                        )}
                    </Tab>

                    <Tab eventKey="reporting" title={<>Cross-Site Historical Reporting</>}>
                        {activeKey === 'reporting' && <CrossSiteHistoricalReportingContent />}
                    </Tab>

                    <Tab eventKey="sku" title={<>Set Up SKU / Auto Pull Management</>}>
                        {activeKey === 'sku' && <SkuAutoPullSetup />}
                    </Tab>

                    <Tab className="position-relative" eventKey="bulkupload" title={<>Bulk Target Product Upload</>}>
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
                        {activeKey === 'bulkupload' && <BulkProductUpload />}
                    </Tab>
                </Tabs>
            </Container>
        </AppFrontLayout>
    );
}
