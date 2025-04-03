import { ProductProps } from '@/types/cm';
import { InfoIcon } from 'lucide-react';
import { Image } from 'primereact/image';
import {  OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

// Sample Data
const tableData = [
    {
        website: 'Amazon',
        publishedDate: '03-31-2025',
        totalProducts: 7758,
        stock: 4225,
        outstock: 3533,
        active: false,
        lastPublished: '01-07-2020',
        products: 0,
        found: 0,
        product_difference: 0,
    },
    {
        website: 'Wayfair',
        publishedDate: '03-31-2025',
        totalProducts: 5155,
        stock: 5107,
        outstock: 48,
        active: true,
        lastPublished: '02-03-2022',
        products: 0,
        found: 0,
        product_difference: 0,
    },
    {
        website: 'Lowes',
        publishedDate: '03-31-2025',
        totalProducts: 1451,
        stock: 1220,
        outstock: 231,
        active: false,
        lastPublished: '01-07-2020',
        products: 0,
        found: 0,
        product_difference: 0,
    },
    {
        website: 'Bed Bath & Beyond',
        publishedDate: '03-31-2025',
        totalProducts: 7323,
        stock: 0,
        outstock: 7323,
        active: false,
        lastPublished: '11-10-2019',
        products: 0,
        found: 0,
        product_difference: 0,
    },
    {
        website: 'Home Depot',
        publishedDate: '03-31-2025',
        totalProducts: 989,
        stock: 896,
        outstock: 93,
        active: false,
        lastPublished: '02-10-2020',
        products: 0,
        found: 0,
        product_difference: 0,
    },
    {
        website: 'Build',
        publishedDate: '03-31-2025',
        totalProducts: 4439,
        stock: 4439,
        outstock: 0,
        active: false,
        lastPublished: '11-10-2019',
        products: 0,
        found: 0,
        product_difference: 0,
    },
    {
        website: 'Lumens',
        publishedDate: '03-31-2025',
        totalProducts: 2819,
        stock: 2628,
        outstock: 191,
        active: false,
        lastPublished: '11-05-2024',
        products: 0,
        found: 0,
        product_difference: 0,
    },
    {
        website: 'Lighting New York',
        publishedDate: '03-31-2025',
        totalProducts: 3337,
        stock: 3195,
        outstock: 142,
        active: false,
        lastPublished: '',
        products: 0,
        found: 0,
        product_difference: 0,
    },
];
const tableImage = [
    { icon: 'web.png', label: 'Website Data', tooltip: 'Information about websites.', colspan: 2 },
    { icon: 'shopping-bag.jpg', label: 'Products Found Data', tooltip: 'some data', colspan: 2 },
    { icon: 'out-of-stock.jpg', label: 'Image Data', tooltip: 'Percentage of products with images.', colspan: 5 },
    // { icon: 'check.png', label: 'SKU', tooltip: 'Stock Keeping Unit data.', colspan: 2 },
];
// Tooltip Component
const renderTooltip = (message: string) => <Tooltip id="button-tooltip">{message}</Tooltip>;
export default function ProductNumbers({ product }: ProductProps) {
    return (
        < >
            <Table id={product} striped bordered hover responsive className="contentTable text-center">
                <thead className="border-white">
                    <tr className="iconHead">
                        {tableImage.map((item, index) => (
                            <th key={index} colSpan={item.colspan}>
                                <Image src={`./images/icons/${item.icon}`} alt={item.label} />
                                <div className="text-uppercase fw-medium iconText">
                                    {' '}
                                    <span className="me-1">{item.label}</span>
                                    {item.tooltip !== '' && (
                                        <OverlayTrigger placement="top" overlay={renderTooltip(item.tooltip)}>
                                            <InfoIcon width={10} className="me-1" />
                                        </OverlayTrigger>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                    <tr className="table-dark iconHeadmain align-middle text-white">
                        <th>Website Name</th>
                        <th>Published Data as Of</th>
                        <th>
                            Total Active <br /> Products
                        </th>
                        <th>
                            #Products <br />
                            In Stock
                        </th>
                        <th>
                            #Products Out
                            <br /> -of-Stock
                        </th>
                        <th>Products No longer Active</th>
                        <th>
                            Auto-pull Daily <br />
                            Set Up
                            <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products with 5+ publishedDate.')}>
                                <InfoIcon width={10} className="me-1" />
                            </OverlayTrigger>
                        </th>
                        <th>
                            Last Date Set Up
                            <br /> SKUs
                            <br /> Published{' '}
                            <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products with outstock.')}>
                                <InfoIcon width={10} className="me-1" />
                            </OverlayTrigger>
                        </th>

                        
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index} className="text-center">
                            <td>{row.website}</td>
                            <td>{row.publishedDate}</td>
                            <td>{row.totalProducts}</td>
                            <td>{row.stock}</td>
                            <td>{row.outstock}</td>
                            <td>{row.active ? 0 : 1}</td>

                            <td className="text-center">
                                {row.active ? <i className="fa fa-check text-success"></i> : <i className="fa fa-times text-danger"></i>}
                            </td>
                            <td>{row.lastPublished}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
