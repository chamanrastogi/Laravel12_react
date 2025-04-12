import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { Image } from 'primereact/image';
import { Button, Col, Form, Row } from 'react-bootstrap';
import dayjs from 'dayjs';

import '../../../../../../css/table.css';
import '../../../../../../css/multiselect.css';

interface Product {
    id: number;
    product_sku: string;
    website_sku: string;
    product_name: string;
    original_date_found: string;
    stock_status: string;
    price: number;
    previous_price: number;
    image_count: number;
    video_count: number;
    bullet_points: number;
    attribute: number;
    avg_review_rating: number;
    review_count: number;
    prime: boolean;
    last_updated: string;
}

const areas = [
    { label: 'Product Price', value: 'price' },
    { label: 'Product Name', value: 'product_name' },
    { label: '# of products per PDP page', value: 'variation_count' },
    { label: 'Prime', value: 'prime' },
    { label: '# of Images', value: 'images' },
    { label: '# of Videos', value: 'videos' },
    { label: '# of Bullet Points', value: 'bullet' },
    { label: '# of Attributes', value: 'attribute' },
    { label: '# of Review Rating Avg', value: 'rating' },
    { label: '# of Review Ratings', value: 'reviews' },
    { label: 'Stock Status', value: 'in_stock' },
    { label: 'Primary Category', value: 'primary_category' },
    { label: 'Primary Category Rank', value: 'primary_category_rank' },
    { label: 'Romance Copy', value: 'romance_copy' },
];

const productStatuses = [
    { value: 3, label: 'All' },
    { value: 0, label: 'Active (In Stock & Out of Stock)' },
    { value: 2, label: 'Inactive' },
];

export default function ContentHistory() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedArea, setSelectedArea] = useState(areas.map(a => a.value));
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [first, setFirst] = useState(0);
    const [rows] = useState(10);
    const [sortField, setSortField] = useState<keyof Product | undefined>();
    const [sortOrder, setSortOrder] = useState<1 | -1 | undefined | null>();
    const [filters, setFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const res = await axios.get('/ajaxProducts', {
                params: {
                    page,
                    sortField,
                    sortOrder,
                    filters: JSON.stringify(filters),
                    search: searchTerm,
                },
            });

            setProducts(res.data.data);
            setTotalRecords(res.data.total);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [sortField, sortOrder, filters, searchTerm]);

    useEffect(() => {
        fetchProducts(first / rows + 1);
    }, [first, rows, fetchProducts]);

    return (
        <div className="border p-3">
            <Row className="d-flex justify-content-between">
                <Col md={6} className="mt-3">
                    <h5>
                        <Image src="./images/icons/shopping-bag.jpg" alt="Shoping Bag" />
                        &nbsp;Content History
                    </h5>
                </Col>
                <Col md={6} className="mt-3 text-end">
                    <Button size="sm" variant="primary" className="me-1">HISTORICAL DATA</Button>
                    <Button size="sm" variant="primary">DOWNLOAD PRICE NOT CHANGED TODAY</Button>
                </Col>
            </Row>

            <Row className="align-items-center mb-2">
                <Col md={6}>
                    <Form.Label className="fw-bold me-1">Select All Products Or A Target Product List</Form.Label>
                    <Form.Select size="sm" className="d-inline-block mt-1 w-auto" defaultValue="Display All Products">
                        <option>Display All Products</option>
                        <option>Target Product List</option>
                    </Form.Select>
                    <Button size="sm" variant="primary" className="mx-2">FIX MY CONTENT</Button>
                </Col>

                <Col md={6} className="text-end">
                    <Form.Label className="fw-bold me-1">Area Analyzed:</Form.Label>
                    <MultiSelect
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.value)}
                        options={areas}
                        optionLabel="label"
                        maxSelectedLabels={3}
                        className="me-2 mt-1 w-auto border-1"
                        filter
                        placeholder="Select Area"
                    />
                    <Button size="sm" variant="primary" className="me-1">DISPLAY</Button>
                    <Button size="sm" variant="primary">DOWNLOAD DETAILS OF BELOW REPORT</Button>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col>
                    <Form.Label className="fw-bold me-1">Select Product Status:</Form.Label>
                    <Form.Select size="sm" className="d-inline-block w-auto me-3 mt-1">
                        {productStatuses.map((status) => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            <Row className="d-flex gap-2 mb-2">
                <Col>
                    <Form.Check inline type="radio" name="changeFilter" label="All changes" defaultChecked />
                    <Form.Check inline type="radio" name="changeFilter" label="Last day" />
                    <Form.Check inline type="radio" name="changeFilter" label="Prior 7 days" />
                    <Form.Check inline type="radio" name="changeFilter" label="Prior 30 days" />
                </Col>
            </Row>

            <Row className="justify-content-between align-items-center">
                <Col>
                    <div className="text-danger mt-2">
                        All Active Product Data from today's crawl, <strong>{dayjs().format('MM/DD/YYYY')}</strong> is published.
                    </div>
                </Col>
                <Col className="text-end">
                    <Form.Label className="fw-bold me-1">Search:</Form.Label>
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Search..."
                        className="d-inline-block w-auto"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            <DataTable
                value={products}
                loading={loading}
                paginator
                first={first}
                rows={rows}
                rowsPerPageOptions={[10, 25, 50, 100]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                lazy
                dataKey="id"
                totalRecords={totalRecords}
                sortField={sortField}
                sortOrder={sortOrder}
                filters={filters}
                filterDisplay="row"
                onPage={(e) => setFirst(e.first)}
                onSort={(e) => {
                    setSortField(e.sortField as keyof Product);
                    setSortOrder(e.sortOrder === 1 ? 1 : -1);
                }}
                onFilter={(e) => setFilters(e.filters)}
                className="p-datatable-sm custom-datatable mt-3"
                showGridlines
                stripedRows
                responsiveLayout="scroll"
            >
                <Column field="product_sku" header="Product SKU" style={{ minWidth: '12rem' }} sortable />
                <Column field="website_sku" header="Account SKU" sortable />
                <Column field="product_name" header="Product Name" sortable filter filterPlaceholder="Search by name" />
                <Column field="original_date_found" header="Original Date Found" body={(row) => dayjs(row.original_date_found).format('DD-MM-YYYY')} />
                <Column field="stock_status" header="Stock Status" />
                <Column field="price" header="Price" body={(row) => `$${row.price?.toFixed(2) || '0.00'}`} />
                <Column field="previous_price" header="Previous Price" body={(row) => `$${row.previous_price?.toFixed(2) || '0.00'}`} />
                <Column field="image_count" header="# Images" />
                <Column field="video_count" header="# Videos" />
                <Column field="bullet_points" header="# Bullet Points" />
                <Column field="attribute" header="# Attributes" />
                <Column field="avg_review_rating" header="Avg. Rating" />
                <Column field="review_count" header="# Reviews" />
                <Column field="prime" header="Prime" />
                <Column field="last_updated" header="Last Modified" />
            </DataTable>
        </div>
    );
}
