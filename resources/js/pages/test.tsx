import AppFrontLayout from "@/layouts/front-layout";
import React from "react";
import { Container, Tab, Tabs, Table, Form } from "react-bootstrap";

const Test = () => {
    return (
        <AppFrontLayout>
            <Container className="mt-4">
                <h2>Content Management</h2>

                {/* Tabs Navigation */}
                <Tabs defaultActiveKey="dashboard" id="contentTabs" className="mb-3">
                    <Tab eventKey="dashboard" title={<><i className="fa fa-tachometer-alt"></i> Content Management Dashboard</>}>
                        <div className="mt-4">
                            <Form.Label>Select All Products Or A Target Product List:</Form.Label>
                            <Form.Select className="w-auto d-inline-block">
                                <option>Display All Products</option>
                                <option>Amazon</option>
                                <option>Wayfair</option>
                                <option>Lowes</option>
                            </Form.Select>
                        </div>

                        {/* Data Table */}
                        <Table bordered striped className="mt-4">
                            <thead className="table-dark">
                                <tr>
                                    <th>Website Name</th>
                                    <th>Published Data as Of</th>
                                    <th>Total Active Products</th>
                                    <th>#Products In Stock</th>
                                    <th>#Products Out-of-Stock</th>
                                    <th>Auto-pull Daily Set Up</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Amazon</td>
                                    <td>03/29/2025</td>
                                    <td>7758</td>
                                    <td>4225</td>
                                    <td>3533</td>
                                    <td>❌</td>
                                </tr>
                                <tr>
                                    <td>Wayfair</td>
                                    <td>03/29/2025</td>
                                    <td>5158</td>
                                    <td>5110</td>
                                    <td>48</td>
                                    <td>✅</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>

                    <Tab eventKey="account-details" title={<><i className="fa fa-user"></i> Individual Account Details</>}>
                        Individual Account Details Content
                    </Tab>

                    <Tab eventKey="reporting" title={<><i className="fa fa-chart-line"></i> Cross-Site Historical Reporting</>}>
                        Cross-Site Historical Reporting Content
                    </Tab>

                    <Tab eventKey="sku" title={<><i className="fa fa-barcode"></i> Set Up SKU / Auto Pull Management</>}>
                        Set Up SKU / Auto Pull Management Content
                    </Tab>

                    <Tab eventKey="bulk-upload" title={<><i className="fa fa-book"></i> Bulk Target Product Upload</>}>
                        Bulk Target Product Upload Content
                    </Tab>
                </Tabs>
            </Container>
        </AppFrontLayout>
    );
};

export default Test;
