import { AccountProps } from '@/types/accounts';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { InfoIcon } from 'lucide-react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Image } from 'primereact/image';
import { MultiSelect } from 'primereact/multiselect';
import { useCallback, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import '../../../../../../css/multiselect.css';
import '../../../../../../css/table.css';

interface WebsiteCategory {
    website_category_name: string;
}
interface AvgRansk {
    days: string;
    month_1_avg: string;
}
interface Product {
    id: number;
    product_sku: string;
    website_sku: string;
    website_category?: WebsiteCategory; // Optional relationship
    avg_ranks?: AvgRansk;
    days_appearing: string;
    average_rank: string;
    product_name: string;
    original_date_found: string;
    brand: string;
    price: number;
    previous_price: number;
    image_count: number;
    high_res_image_count: number;
    video_count: number;
    review_rating: number;
    avg_review_rating: number;
    in_stock: string;
    avg_ship: string;
    prime: boolean;
}

const videoLinks = [
    { title: 'Content Alignment - Why does it matter?', src: '#' },
    { title: 'Understand what content is most important', src: '#' },
    { title: 'Perform Content Alignment for new products', src: '#' },
    { title: 'Determine target products', src: '#' },
    { title: 'How to upload target products for a single site', src: '#' },
    { title: '9.0 & 9.1 - Bulk Target Product List Uploads', src: '#' },
    { title: 'Understanding "Primary" Categories', src: '#' },
    { title: 'Manage Content Alignment improvement', src: '#' },
    { title: 'Using the High-Level Action Report', src: '#' },
    { title: 'Using the Product Level Action Report', src: '#' },
    { title: 'Using the Action Reports', src: '#' },
    { title: 'Find Review Data for My Products', src: '#' },
    { title: 'Set Up SKU Auto Pull Management', src: '#' },
    { title: '9.1 Filter Out Unwanted SKUs', src: '#' },
    { title: 'How To Delete Target Product Lists', src: '#' },
];
const category = [
    { name: 'Primary Category' },
    { name: 'Days Appearing Last 30 Days' },
    { name: 'Average Rank Last 30 Days' },
    { name: 'Original Date Found' },
    { name: 'Product Name' },
    { name: 'Brand Name' },
    { name: '# of products per PDP page' },
    { name: 'SKU’s on same PDP Page' },
    { name: 'Price' },
    { name: 'Prime' },
    { name: 'Product Desc/Romance Copy' },
    { name: 'Bullet Points' },
    { name: '# of Bullet Points' },
    { name: 'Images' },
    { name: 'Videos' },
    { name: 'Review Ratings' },
    { name: 'Review Rating Avg' },
    { name: 'In Stock' },
    { name: 'Quick Ship' },
    { name: 'Shipping Info' },
    { name: 'Product Url' },
    { name: 'Attributes' },
    { name: '# of Attributes' },
    { name: 'Product Finish' },
];

const renderTooltip = (message: string) => <Tooltip id="button-tooltip">{message}</Tooltip>;
export default function ProductData({ webId,webName,active_state,target }: AccountProps) {
    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [first, setFirst] = useState(0);
    const [rows] = useState(100);
    const [sortField, setSortField] = useState<keyof Product | undefined>();
    const [sortOrder, setSortOrder] = useState<1 | -1 | undefined | null>();
    const [filters, setFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const initialProduct = 'all'; // Define a default value for initialProduct
    // Use string to match select option values
    const [selectedProduct, setSelectedProduct] = useState<string>(initialProduct);
    const [inStock, setinStock] = useState<string>(active_state);

    const [selectedCategory, setSelectedCategory] = useState([]);

    const fetchProducts = useCallback(
        async (page = 1) => {
            setLoading(true);
            try {
                const res = await axios.get('/ajaxProducts', {
                    params: {
                        page,
                        sortField,
                        sortOrder,
                        filters: JSON.stringify(filters),
                        search: searchTerm,
                        in_stock: inStock, // <-- already passed here
                        websiteId: webId,
                        target:target
                    },
                });
                setProducts(res.data.data);
                setTotalRecords(res.data.total);
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        },
        [sortField, sortOrder, filters, searchTerm, webId,target, inStock], // <-- dependency
    );

    useEffect(() => {
        fetchProducts(first / rows + 1);
    }, [first, rows, fetchProducts, inStock]); // <-- add inStock here
    return (
        <div className="border p-3">
            <Row className="d-flex justify-content-center">
                <Col className="col-8 text-end">
                    <Form.Label className="fw-bold me-1">Select All Products Or A Target Product List </Form.Label>
                    <Form.Select
                        size="sm"
                        className="d-inline-block mt-1 w-auto"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                        <option value="all">Display All Products</option>
                        <option value="amazon">Amazon</option>
                        <option value="wayfair">Wayfair</option>
                        <option value="lowes">Lowes</option>
                    </Form.Select>{' '}
                    <Button size="sm" variant="primary" className="me-1 common_btn ">
                        FIX MY CONTENT
                    </Button>
                </Col>
                <Col className="col-4 text-end">
                    <Button size="sm" variant="primary" className="me-1 mt-1 common_btn">
                        API INSTRUCTIONS
                    </Button>
                </Col>
            </Row>
            <Row className="d-flex justify-content-between">
                <Col md={12} className="mt-3">
                    <h2 className="pageheading">
                        <Image src="./images/icons/shopping-bag.jpg" alt="Shoping Bag" /> {webName} Unique Products{' '}
                        <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products with 5+ publishedDate.')}>
                            <InfoIcon width={15} className="me-1" />
                        </OverlayTrigger>
                        <Dropdown className="btn iconpos border-0 ps-1">
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
                        <span className="d-inline-flex fs-6">
                            <Link className="text-danger fw-bold me-2" href="#">
                                Click here
                            </Link>{' '}
                            to update this data so both Product SKUs and UPC codes are present.
                        </span>
                    </h2>
                </Col>
            </Row>
            <Row className="d-flex">
                <Col md={12} className='text-end'>
                    <Form.Label className="lead me-1 text-normal">Comparison Selection </Form.Label>
                    <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products with 5+ publishedDate.')}>
                        <InfoIcon width={15} className="me-1" />
                    </OverlayTrigger>
                    <span className="me-2">:</span>
                    <MultiSelect
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.value)}
                        options={category}
                        optionLabel="name"
                        filter
                        placeholder="[All Selected]"
                        maxSelectedLabels={3}
                        className="md:w-20rem me-3 text-start multi_select px-0"
                    />
                    <Button variant="primary" className="common_btn me-1">
                        DOWNLOAD FILE
                    </Button>
                    <Button variant="primary" className="common_btn me-1">
                        Download Attribute & Bullet Point Analysis
                    </Button>
                    <Button variant="primary" className="common_btn me-1">
                        Products Not Ranking in Any Category
                    </Button>
                </Col>
            </Row>
            <Row className="d-flex py-3">
                <Col md={2}>
                    <Form.Select size="sm" className="d-inline-block mt-1 w-full" value={inStock} onChange={(e) => setinStock(e.target.value)}>
                        <option value="0">Products - In Stock</option>
                        <option value="2">Products - Can’t Purchase</option>
                        <option value="3">Products - All</option>
                    </Form.Select>
                </Col>
                <Col md={3} className="mt-2">
                    <Form.Check inline type="checkbox" name="changeFilter" label="Display SKUs with multiple PDP pages" defaultChecked />
                </Col>
                <Col md={2} className="mt-2">
                    <Form.Check inline type="checkbox" name="changeFilter" label="Only display Sku that you control" />
                </Col>
                <Col md={3} className="mt-2">
                    {' '}
                    <Form.Check inline type="checkbox" name="changeFilter" label="Display product that is not ranking in the Primary Category" />
                </Col>
                <Col md={2} className="text-end">
                    <Button size="sm" variant="primary" className="me-1 mt-1 common_btn">
                        ADD SELECTED IMAGE & DATA
                    </Button>{' '}
                </Col>
            </Row>
            <Row className="justify-content-between align-items-baseline">
                <Col>
                    <div className="text-success mt-2">
                        All Active Product Data from today’s crawl, <strong>05/09/2025</strong> is published.
                    </div>
                    <div className="text-danger mt-2">
                        To access your products historical data, please go to the Content History screen by{' '}
                        <Link className="text-danger fw-bold me-2" href="#">
                            clicking here.
                        </Link>
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
            <Row>
                <DataTable
                    value={products}
                    loading={loading}
                    paginator
                    first={first}
                    rows={rows}
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
                    scrollable
                    scrollHeight="540px"
                    responsiveLayout="scroll"
                >
                    <Column field="product_sku" header="Product SKU" frozen style={{ minWidth: '12rem' }} sortable />
                    <Column field="website_sku" header="Account SKU" frozen sortable />
                    <Column field="website_category.website_category_name" sortable header="Primary Category" />
                    <Column
                        field="avg_ranks.days"
                        sortable
                        header="Days Appearing Last 30 Days"
                        body={(rowData) => rowData.avg_ranks?.days ?? 'N/A'}
                    />
                    <Column field="average_rank" sortable header="Average Rank Last 30 Days" body={(rowData) => rowData.average_rank ?? 'N/A'} />
                    <Column
                        field="original_date_found"
                        header="Original Date Found"
                        body={(row) => dayjs(row.original_date_found).format('DD-MM-YYYY')}
                        sortable
                        style={{ minWidth: '12rem' }}
                    />
                    <Column field="product_name" className="text-start" header="Product Name" sortable style={{ minWidth: '24rem' }} />
                    <Column field="brand" className="text-start" sortable header="Brand" />
                    <Column field="price" sortable header="Price" body={(row) => `${row.price?.toFixed(2) || '0.00'}`} />
                    <Column
                        field="previous_price"
                        sortable
                        header="# Products per PDP"
                        body={(row) => `${row.previous_price?.toFixed(2) || '0.00'}`}
                    />
                    <Column field="prime" sortable header="Prime" />
                    <Column field="image_count" sortable header="#Images" />
                    <Column field="high_res_image_count" sortable header="#Hi Res Images" />
                    <Column field="video_count" sortable header="#Videos" />
                    <Column field="review_rating" sortable header="#Review Rating" />
                    <Column field="avg_review_rating" sortable header="Review Rating Avg" />
                    <Column field="in_stock" sortable header="In Stock" />
                    <Column field="avg_ship" sortable header="# Avg Ship Time Last 7 Days" style={{ minWidth: '12rem' }} />
                </DataTable>
            </Row>
        </div>
    );
}
