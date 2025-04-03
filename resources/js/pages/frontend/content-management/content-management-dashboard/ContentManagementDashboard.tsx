import { Image } from 'primereact/image';
import { useState } from 'react';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import ProductContent from './productContent';
import ProductNumbers from './productNumbers';

const videoLinks = [{ title: '9.0 - Content Management Dashboard', src: '#' }];
export default function ContentManagementDashboard() {
    const initialProduct = 'all'; // Define a default value for initialProduct
    const [selectedProduct, setSelectedProduct] = useState<string>(initialProduct || 'all');
    return (
        <>
            <div className="position-absolute end-0 pt-1">
                <Form.Label className="fw-bold me-1">Select All Products Or A Target Product List </Form.Label>
                <Form.Select className="d-inline-block mb-3 w-auto" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                    <option value="all">Display All Products</option>
                    <option value="amazon">Amazon</option>
                    <option value="wayfair">Wayfair</option>
                    <option value="lowes">Lowes</option>
                </Form.Select>
            </div>
            <div className="position-absolute playpos">
                <Dropdown className="btn align-self  border-0 ps-1">
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
            </div>
            <Tabs defaultActiveKey="productnumber" id="uncontrolled-tab-example" className="border-bottom border-top py-1" variant="pills">
                <Tab eventKey="productnumber" title="Product Numbers">
                    <ProductNumbers product={selectedProduct} />
                </Tab>
                <Tab eventKey="productcontent" title="Product Content">
                    <ProductContent />
                </Tab>
            </Tabs>
            <div className="text-end">
                {' '}
                <Button variant="primary">Download Grid</Button>
            </div>
        </>
    );
}
