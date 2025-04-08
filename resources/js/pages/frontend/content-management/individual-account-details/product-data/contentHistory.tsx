import axios from 'axios';
import { Column } from 'primereact/column';
import { DataTable, SortOrder } from 'primereact/datatable';
import { Image } from 'primereact/image';
import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import '../../../../../../css/table.css';
import '../../../../../../css/multiselect.css';

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

const ProductStatus = [
    { value: 3, label: 'All' },
    { value: 0, label: 'Active (In Stock & Out of Stock)' },
    { value: 2, label: 'Inactive' },
];



export default function ContentHistory() {
    const [products, setProducts] = useState([]);
    const [selectedArea, setSelectedArea] = useState(areas.map((c) => c.value)); // All selected by default
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [first, setFirst] = useState(0);
    const [rows] = useState(10);
    const [sortField, setSortField] = useState<string >();
    const [sortOrder, setSortOrder] = useState<SortOrder>();
    const [filters, setFilters] = useState({});
    

    const fetchProducts = async (page = 1) => {
      setLoading(true);

      const queryParams = {
          page,
          sortField,
          sortOrder,
          filters: JSON.stringify(filters),
      };
  
      try {
          const res = await axios.get('/ajaxProducts', { params: queryParams });
          setProducts(res.data.data);
          setTotalRecords(res.data.total);
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
    };

    useEffect(() => {
      fetchProducts(first / rows + 1);
  }, [first, rows, sortField, sortOrder, filters]);

    return (
        <div className="border p-3">
            <Row className="d-flex justify-content-between">
                <Col md={6} className="mt-3">
                    <h5>
                        <Image src="./images/icons/shopping-bag.jpg" alt="Shoping Bag" /> Content History
                    </h5>
                </Col>
                <Col md={6} className="mt-3 text-end">
                    <Button size="sm" variant="primary" className="me-1">
                        HISTORICAL DATA
                    </Button>
                    <Button size="sm" variant="primary" className="me-1">
                        DOWNLOAD PRICE NOT CHANGED TODAY
                    </Button>
                </Col>
            </Row>
            <Row className="align-items-center mb-2">
                <Col md={6} className="align-items-end flex">
                    <Form.Label className="fw-bold me-1">Select All Products Or A Target Product List</Form.Label>
                    <Form.Select size="sm" className="d-inline-block mt-1 w-auto" defaultValue="Display All Products">
                        <option>Display All Products</option>
                        <option>Target Product List</option>
                    </Form.Select>
                    <Button size="sm" variant="primary" className="mx-2">
                        FIX MY CONTENT
                    </Button>
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

                    <div className="align-self-baseline d-inline-block">
                        <Button size="sm" variant="primary" className="me-1">
                            DISPLAY
                        </Button>
                        <Button size="sm" variant="primary">
                            DOWNLOAD DETAILS OF BELOW REPORT
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row className="align-items-center mb-2">
                <Col md={12}>
                    <Form.Label className="fw-bold me-1">Select Product Status:</Form.Label>
                    <Form.Select size="sm" className="d-inline-block me-3 mt-1 w-auto">
                        {ProductStatus.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            <Row className="d-flex gap-2">
                <Col>
                    <Form.Check
                        inline
                        type="radio"
                        name="changeFilter"
                        id="allChanges"
                        label="Show last content changes for all products"
                        defaultChecked
                    />
                    <Form.Check inline type="radio" name="changeFilter" id="lastDay" label="Show products with changes in the last day" />
                    <Form.Check inline type="radio" name="changeFilter" id="last7" label="Show products with changes, Prior 7 Days" />
                    <Form.Check inline type="radio" name="changeFilter" id="last30" label="Show products with changes, Prior 30 Days" />
                </Col>
            </Row>
            <Row className="justify-content-between align-items-baseline">
                <Col>
                    <div className="text-danger mt-2">
                        All Active Product Data from today’s crawl, <strong>04/07/2025</strong> is published.
                    </div>
                </Col>
                <Col className="text-end">
                    <Form.Label className="fw-bold me-1">Search:</Form.Label>
                    <Form.Control size="sm" className="d-inline-block w-auto" type="text" placeholder="Search..." />
                </Col>
            </Row>

            <DataTable
                value={products}
                loading={loading}
                paginator
                first={first}
                rows={rows}
                
                size="small"
                showGridlines
                stripedRows
                totalRecords={totalRecords}
                onPage={(e) => setFirst(e.first)}
                lazy
                dataKey="id"
                sortField={sortField}
                sortOrder={sortOrder}
                filters={filters}
                filterDisplay="row"
                onSort={(e) => {
                  setSortField(e.sortField);
                  const order = typeof e.sortOrder === 'string'
                      ? e.sortOrder === 'asc' ? 1 : -1
                      : e.sortOrder;
                  setSortOrder(order);
                }}
                onFilter={(e) => {
                    setFilters(e.filters);
                }}
                className="p-datatable-sm custom-datatable mt-3"
                responsiveLayout="scroll"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            >
                <Column field="product_sku" style={{ minWidth: '12rem' }}  header="Product SKU" sortable  />
                <Column field="website_sku" header="Account SKU" sortable  />
                <Column field="product_name" header="Product Name" sortable filter filterPlaceholder="Search by name" />
                <Column field="original_date_found" header="Original Date Found" body={(row) => dayjs(row.original_date_found).format('DD-MM-YYYY')} />
                <Column field="stock_status" header="Stock Status" />
                <Column field="price" header="Price" body={(row) => `$${row.price.toFixed(2)}`} />
                <Column field="previous_price" header="Previous Price" body={(row) => `$${row.previous_price.toFixed(2)}`} />
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
