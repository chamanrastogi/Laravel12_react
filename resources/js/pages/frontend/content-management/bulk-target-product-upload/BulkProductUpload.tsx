import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ManageTargetProducts from './ManageTargetProducts';
import ImageCheckUpload from './ImageCheckUpload';
import BulkUpdateUpload from './BulkUpdateUpload';
import AllTargetProducts from './AllTargetProducts';

export default function BulkProductUpload() {
    return (
        <>
            <Tabs defaultActiveKey="BulkUpdateUpload" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="BulkUpdateUpload" title="BULK UPDATE/UPLOAD">
                   <BulkUpdateUpload/>
                </Tab>
                <Tab eventKey="ImageCheckUpload" title="IMAGE CHECK UPLOAD">
                    <ImageCheckUpload/>
                </Tab>
                <Tab eventKey="ManageTargetProducts" title="MANAGE TARGET PRODUCT LISTS" >
                    <ManageTargetProducts/>
                </Tab>
                <Tab eventKey="AllTargetProducts" title="ALL TARGET PRODUCTS" >
                    <AllTargetProducts/>
                </Tab>
             
                
                
            </Tabs>
        </>
    );
}
