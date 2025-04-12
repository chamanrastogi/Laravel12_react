import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AutoPullSetup from './AutoPullSetup';
import FilterOutUnwantedSKUs from './FilterOutUnwantedSKUs';
export default function SkuAutoPullSetup() {
    const [activeKey, setActiveKey] = useState('autoPullSetup');
    return (
        <>
            <Tabs activeKey={activeKey} onSelect={(k) => k && setActiveKey(k)} id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="autoPullSetup" title="Auto Pull / Set Up SKU">
                    {activeKey === 'autoPullSetup' && <AutoPullSetup />}
                </Tab>
                <Tab eventKey="filterOutUnwantedSKUs" title="Filter Out Unwanted SKUs">
                    {activeKey === 'filterOutUnwantedSKUs' && <FilterOutUnwantedSKUs />}
                </Tab>
            </Tabs>
        </>
    );
}
