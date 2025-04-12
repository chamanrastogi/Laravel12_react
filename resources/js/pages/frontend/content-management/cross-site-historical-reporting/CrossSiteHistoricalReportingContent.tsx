import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PricingStockStatus from './PricingStockStatus';
import ProductContent from './ProductContent';
import SavedAutomatedReporting from './SavedAutomatedReporting';
import { useState } from 'react';
export default function CrossSiteHistoricalReportingContent() {
    const [activeKey, setActiveKey] = useState('priceStockStatus');
    return (
        <>
            <Tabs activeKey={activeKey} onSelect={(k) => k && setActiveKey(k)} id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="priceStockStatus" title="Pricing & Stock Status">
                {activeKey === 'priceStockStatus' &&  <PricingStockStatus/>}
                </Tab>
                <Tab eventKey="productContent" title="Product Content">
                {activeKey === 'productContent' &&  <ProductContent/>}
                </Tab>
                <Tab eventKey="SavedAutomatedReporting" title="Saved Automated Reporting" >
                {activeKey === 'SavedAutomatedReporting' &&  <SavedAutomatedReporting/>}
                </Tab>
            </Tabs>
        </>
    );
}
