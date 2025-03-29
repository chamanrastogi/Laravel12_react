
import AppFrontLayout from '@/layouts/front-layout';
import React from 'react';

const test = () => {
    return (
        <AppFrontLayout>

<div className="container mt-4">
        <h2>Content Management</h2>
        <ul className="nav nav-tabs" id="contentTabs">
            <li className="nav-item">
                <a className="nav-link active" id="dashboard-tab" data-bs-toggle="tab" href="#dashboard"><i
                        className="fa fa-tachometer-alt"></i> Content Management Dashboard</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="account-details-tab" data-bs-toggle="tab" href="#account-details"><i
                        className="fa fa-user"></i> Individual Account Details</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="reporting-tab" data-bs-toggle="tab" href="#reporting"><i
                        className="fa fa-chart-line"></i> Cross-Site Historical Reporting</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="sku-tab" data-bs-toggle="tab" href="#sku"><i className="fa fa-barcode"></i> Set Up
                    SKU / Auto Pull Management</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="bulk-upload-tab" data-bs-toggle="tab" href="#bulk-upload"><i
                        className="fa fa-book"></i> Bulk Target Product Upload</a>
            </li>
        </ul>

        <div className="tab-content mt-3">
            <div className="tab-pane fade show active" id="dashboard"><div className="mt-4">
                <label >Select All Products Or A Target Product List:</label>
                <select id="productList" className="form-select w-auto d-inline-block">
                    <option>Display All Products</option>
                    <option>Amazon</option>
                    <option>Wayfair</option>
                    <option>Lowes</option>
                </select>
            </div>

            <table className="table table-bordered mt-4">
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
            </table></div>
            <div className="tab-pane fade" id="account-details">Individual Account Details Content</div>
            <div className="tab-pane fade" id="reporting">Cross-Site Historical Reporting Content</div>
            <div className="tab-pane fade" id="sku">Set Up SKU / Auto Pull Management Content</div>
            <div className="tab-pane fade" id="bulk-upload">Bulk Target Product Upload Content</div>
        </div>
    </div>


            </AppFrontLayout>
    );
};

export default test;
