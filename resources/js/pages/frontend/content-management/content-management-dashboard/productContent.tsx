import { ProductProps } from '@/types/cm';
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

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

// Tooltip Component
const renderTooltip = (message: string) => <Tooltip id="button-tooltip">{message}</Tooltip>;
export default function ProductContent({ product }: ProductProps) {
    return (
        <div className="container mt-4">
            <h2> Product Content Page {product}</h2>

            <Table striped bordered hover responsive className="contentTable">
                <thead className="table-dark">
                    <tr>
                        <th>Website Name</th>

                        <th>Published Data as Of</th>
                        <th>Total Active Products</th>
                        <th>#Products In Stock</th>
                        <th>#Products Out -of-Stock</th>
                        <th>Products No longer Active</th>
                        <th>
                            Auto-pull Daily{' '}
                            <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products with 5+ publishedDate.')}>
                                <i className="fa fa-info-circle"></i>
                            </OverlayTrigger>
                        </th>
                        <th>
                            Last Date Set Up SKUs Published{' '}
                            <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products with outstock.')}>
                                <i className="fa fa-info-circle"></i>
                            </OverlayTrigger>
                        </th>

                        <th># of products </th>
                        <th>The # of products we found and created URLs</th>
                        <th>Difference between Products provide and Products created</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                         <tr key={index} className='text-center'>
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
                            <td>{row.products}</td>
                            <td>{row.found}</td>
                            <td>{row.product_difference}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Button variant="primary">
                <i className="fa fa-download text-danger"></i>
                Download Grid
            </Button>
        </div>
    );
}
