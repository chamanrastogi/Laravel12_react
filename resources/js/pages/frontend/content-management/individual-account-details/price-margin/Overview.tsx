import axios from 'axios';
import { InfoIcon } from 'lucide-react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Row as HeaderRow } from 'primereact/row';
import { useEffect, useState } from 'react';
import { Col, Form, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';

import '../../../../../../css/table.css';
import { ApiResponse, LazyParams, PriceEntry, ApiProductPriceRecord } from '@/types/OverviewData';

export default function Overview() {
    const [visited, setVisited] = useState(true);
    const [data, setData] = useState<ApiProductPriceRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [lazyParams, setLazyParams] = useState<LazyParams>({
        first: 0,
        rows: 10,
        page: 1,
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get<ApiResponse>('/ajaxOverviewDataTab', {
                params: {
                    page: lazyParams.page,
                    per_page: lazyParams.rows,
                    search: searchText,
                    active: visited,
                },
            });

            const parsedData = response.data.data.map((item) => {
                try {
                    return {
                        ...item,
                        json_data: item.json_data ? JSON.parse(item.json_data) : {},
                    };
                } catch (error) {
                    console.error('Error parsing price data:', error);
                    return {
                        ...item,
                        json_data: {},
                    };
                }
            });

            setData(parsedData);
            setTotalRecords(response.data.total);
        } catch (error) {
            console.error('Failed to load margin data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [lazyParams, searchText]);

    const onPage = (event: DataTableStateEvent) => {
        setVisited(false);
        setLazyParams({
            ...lazyParams,
            first: event.first,
            rows: event.rows,
            page: Math.floor(event.first / event.rows) + 1,
        });
    };

    const renderTooltip = (msg: string) => <Tooltip id="tooltip">{msg}</Tooltip>;

    const priceTemplate = (rowData: ApiProductPriceRecord, field: keyof PriceEntry) => {
        try {
            const priceData = typeof rowData.json_data === 'string' 
                ? JSON.parse(rowData.json_data) as PriceEntry
                : rowData.json_data as PriceEntry;
            const value = priceData[field];
            return <span>{field === 'dp' && (value === 0 || value === undefined) ? 'N/A' : value}</span>;
        } catch (error) {
            console.error('Error parsing price data:', error);
            return <span>N/A</span>;
        }
    };

    const headerGroup = (
        <ColumnGroup>
            <HeaderRow>
                <Column
                    header="Product SKU"
                    style={{ position: 'sticky', left: 0, zIndex: 2, minWidth: '100px', textAlign: 'left', whiteSpace: 'nowrap' }}
                />
                <Column
                    header="Account SKU"
                    style={{ position: 'sticky', left: 100, zIndex: 2, minWidth: '100px', textAlign: 'left', whiteSpace: 'nowrap' }}
                />
                <Column header="Seller" />
                <Column header="Product Price" />
                <Column header="Net Price" />
                <Column header="List Price" />
                <Column header="Avg Low (30d)" />
                <Column header="Avg Low (LM)" />
                <Column header="Lowest List" />
                <Column header="Highest List" />
                <Column header="Avg Market (30d)" />
                <Column header="Lowest Market" />
                <Column header="Highest Market" />
            </HeaderRow>
        </ColumnGroup>
    );

    return (
        <div className="p-3">
            <Row className="d-flex mb-3 gap-2">
                <Col className="col-auto">
                    <Form.Check
                        inline
                        type="radio"
                        name="changeFilter"
                        id="allChanges"
                        label="Display Distributor Net, List Price & Margin"
                        defaultChecked
                    />
                    <Form.Check inline type="radio" name="changeFilter" id="lastDay" label="Display only Margin" />
                    <Form.Check inline type="radio" name="changeFilter" id="last7" label="Display Distributor Net & Margin" />
                    <Form.Check inline type="radio" name="changeFilter" id="last30" label="Display List Price & Margin" />
                    <Form.Check
                        inline
                        type="checkbox"
                        name="changeFilter"
                        id="buyboxToday"
                        label="Only display listings of seller who has the buy box today"
                    />
                </Col>
                <Col className="text-end">
                    <Button>Download</Button>
                </Col>
            </Row>
{/* 
            <Row className="mb-3">
                <Col>
                    <p>Search: {searchText}</p>
                    <p>First: {lazyParams.first}</p>
                    <p>Per Page: {lazyParams.rows}</p>
                    <p>Total Records: {totalRecords}</p>
                </Col>
            </Row> */}

            <Row>
                <Col className="col-auto">
                    <Form.Label className="fw-bold me-1">
                        Search:{' '}
                        <OverlayTrigger placement="top" overlay={renderTooltip('Search by Product SKU, Website SKU, or Seller')}>
                            <InfoIcon width={15} className="search me-1" />
                        </OverlayTrigger>
                    </Form.Label>
                    <Form.Control
                        size="sm"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setLazyParams(prev => ({ ...prev, page: 1, first: 0 }));
                        }}
                        className="d-inline-block w-auto"
                        type="text"
                        placeholder="Search by SKU or Seller..."
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col className="text-end">
                    <Button
                        className="rounded-circle"
                        icon="pi pi-sync"
                        aria-label="Filter"
                        loading={loading}
                        onClick={fetchData}
                    />
                </Col>
            </Row>

            {loading ? (
                <div className="py-5 text-center">
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <DataTable
                    value={data}
                    lazy
                    paginator
                    first={lazyParams.first}
                    rows={lazyParams.rows}
                    totalRecords={totalRecords}
                    onPage={onPage}
                    loading={loading}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                    currentPageReportTemplate="Page {currentPage} of {totalPages}"
                    alwaysShowPaginator
                    scrollable
                    scrollHeight="500px"
                    headerColumnGroup={headerGroup}
                    className="custom-datatable"
                    paginatorLeft={
                        <div className="text-muted">
                            Total: {totalRecords} records
                        </div>
                    }
                >
                    <Column
                        field="product_sku"
                        header="Product SKU"
                        frozen
                        style={{ textAlign: 'left' }}
                    />
                    <Column
                        field="website_sku"
                        header="Account SKU"
                        frozen
                        style={{ textAlign: 'left' }}
                    />
                    <Column field="seller" header="Seller" />
                    <Column field="product_price" header="Product Price" />
                    <Column body={(row) => priceTemplate(row, 'dp')} />
                    <Column body={(row) => priceTemplate(row, 'lp')} />
                    <Column body={(row) => priceTemplate(row, 'alp_30')} />
                    <Column body={(row) => priceTemplate(row, 'alp_lm')} />
                    <Column body={(row) => priceTemplate(row, 'llp')} />
                    <Column body={(row) => priceTemplate(row, 'hlp')} />
                    <Column body={(row) => priceTemplate(row, 'am_30')} />
                    <Column body={(row) => priceTemplate(row, 'lm')} />
                    <Column body={(row) => priceTemplate(row, 'hm')} />
                </DataTable>
            )}
        </div>
    );
}