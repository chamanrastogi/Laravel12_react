import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FilterOutUnwantedSKUs from './FilterOutUnwantedSKUs';
import AutoPullSetup from './AutoPullSetup';
export default function SkuAutoPullSetup() {
    return (
        <>
            <Tabs defaultActiveKey="AutoPullSetup" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="AutoPullSetup" title="Auto Pull / Set Up SKU">
                   <AutoPullSetup/>
                </Tab>
                <Tab eventKey="FilterOutUnwantedSKUs" title="Filter Out Unwanted SKUs">
                    <FilterOutUnwantedSKUs/>
                </Tab>
               
            </Tabs>
        </>
    );
}
