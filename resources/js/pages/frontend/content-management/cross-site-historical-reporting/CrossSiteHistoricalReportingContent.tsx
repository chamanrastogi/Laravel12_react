import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PricingStockStatus from './pricingStockStatus';
import ProductContent from './productContent';
import SavedAutomatedReporting from './savedAutomatedReporting';
export default function CrossSiteHistoricalReportingContent() {
    return (
        <>
            <Tabs defaultActiveKey="priceStockStatus" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="priceStockStatus" title="Pricing & Stock Status">
                <PricingStockStatus/>
                </Tab>
                <Tab eventKey="productContent" title="Product Content">
               <ProductContent/>
                </Tab>
                <Tab eventKey="SavedAutomatedReporting" title="Saved Automated Reporting" >
                <SavedAutomatedReporting/>
                </Tab>
            </Tabs>
        </>
    );
}
