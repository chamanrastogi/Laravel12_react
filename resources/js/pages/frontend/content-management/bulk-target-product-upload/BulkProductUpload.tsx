import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { useState } from 'react';
import AllTargetProducts from './AllTargetProducts';
import BulkUpdateUpload from './BulkUpdateUpload';
import ImageCheckUpload from './ImageCheckUpload';
import ManageTargetProducts from './ManageTargetProducts';

export default function BulkProductUpload() {
    const [activeKey, setActiveKey] = useState('bulkUpdateUpload');
    return (
        <>
            <Tabs activeKey={activeKey} onSelect={(k) => k && setActiveKey(k)} id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="bulkUpdateUpload" title="BULK UPDATE/UPLOAD">
                    {activeKey === 'bulkUpdateUpload' && <BulkUpdateUpload />}
                </Tab>
                <Tab eventKey="imageCheckUpload" title="IMAGE CHECK UPLOAD">
                    {activeKey === 'imageCheckUpload' && <ImageCheckUpload />}
                </Tab>
                <Tab eventKey="manageTargetProducts" title="MANAGE TARGET PRODUCT LISTS">
                    {activeKey === 'manageTargetProducts' && <ManageTargetProducts />}
                </Tab>
                <Tab eventKey="allTargetProducts" title="ALL TARGET PRODUCTS">
                    {activeKey === 'allTargetProducts' && <AllTargetProducts />}
                </Tab>
            </Tabs>
        </>
    );
}
