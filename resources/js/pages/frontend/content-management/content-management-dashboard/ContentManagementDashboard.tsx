import { ArrowDownCircle } from 'lucide-react';
import { useState } from 'react';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import ProductContent from './productContent';
import ProductNumbers from './productNumbers';
export default function ContentManagementDashboard() {
    const initialProduct = 'all'; // Define a default value for initialProduct
    const [selectedProduct, setSelectedProduct] = useState<string>(initialProduct || 'all');
    return (
        <>
            <div className="position-absolute end-0">
                <Form.Label className="fw-bold">Select All Products Or A Target Product List:</Form.Label>
                <Form.Select className="d-inline-block mb-3 w-auto" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                    <option value="all">Display All Products</option>
                    <option value="amazon">Amazon</option>
                    <option value="wayfair">Wayfair</option>
                    <option value="lowes">Lowes</option>
                </Form.Select>
            </div>
            <Tabs defaultActiveKey="productnumber" id="uncontrolled-tab-example" className="mb-3" variant="pills">
                <Tab eventKey="productnumber" title="Product Numbers">
                    <ProductNumbers product={selectedProduct} />
                </Tab>
                <Tab eventKey="productcontent" title="Product Content">
                    <ProductContent product={selectedProduct} />
                </Tab>
            </Tabs>
            <div className="text-end">
                {' '}
                <Button variant="outline-primary">
                    <ArrowDownCircle size={18} className="iconpos me-2" />
                    Download Grid
                </Button>
            </div>
        </>
    );
}
