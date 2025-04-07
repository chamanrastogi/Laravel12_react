import { Link } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import { Image } from 'primereact/image';
import {  OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
// Sample Data
const tableData = [
    {
        website: 'Amazon',
        percentageWithImages: '37%',
        productsWithoutImages: 6,
        percentageWithVideos: '52%',
        totalReviewRatings: 12246,
        productsBelow3: 173,
        percentageBelow3: '8%',
        averageRating: 4.34,
        autoPull: false,
        lastPublished: '01/07/2020',
    },
    {
        website: 'Wayfair',
        percentageWithImages: '62%',
        productsWithoutImages: 47,
        percentageWithVideos: '4%',
        totalReviewRatings: 19585,
        productsBelow3: 0,
        percentageBelow3: '2%',
        averageRating: 4.68,
        autoPull: true,
        lastPublished: '02/03/2022',
    },
    {
        website: 'Lowes',
        percentageWithImages: '92%',
        productsWithoutImages: 0,
        percentageWithVideos: '100%',
        totalReviewRatings: 2182,
        productsBelow3: 44,
        percentageBelow3: '6%',
        averageRating: 4.48,
        autoPull: false,
        lastPublished: '01/07/2020',
    },
    {
        website: 'Bed Bath & Beyond',
        percentageWithImages: '6%',
        productsWithoutImages: 0,
        percentageWithVideos: '0%',
        totalReviewRatings: 2486,
        productsBelow3: 46,
        percentageBelow3: '2%',
        averageRating: 4.71,
        autoPull: false,
        lastPublished: '11/10/2019',
    },
    {
        website: 'Home Depot',
        percentageWithImages: '74%',
        productsWithoutImages: 0,
        percentageWithVideos: '16%',
        totalReviewRatings: 3657,
        productsBelow3: 13,
        percentageBelow3: '2%',
        averageRating: 4.66,
        autoPull: false,
        lastPublished: '02/10/2020',
    },
    {
        website: 'Build',
        percentageWithImages: '41%',
        productsWithoutImages: 16,
        percentageWithVideos: '14%',
        totalReviewRatings: 15451,
        productsBelow3: 51,
        percentageBelow3: '2%',
        averageRating: 4.64,
        autoPull: false,
        lastPublished: '11/10/2019',
    },
    {
        website: 'Lumens',
        percentageWithImages: '47%',
        productsWithoutImages: 0,
        percentageWithVideos: '6%',
        totalReviewRatings: 39,
        productsBelow3: 30,
        percentageBelow3: '1%',
        averageRating: 4.59,
        autoPull: false,
        lastPublished: '11/05/2024',
    },
    {
        website: 'Lighting New York',
        percentageWithImages: '61%',
        productsWithoutImages: 0,
        percentageWithVideos: '0%',
        totalReviewRatings: 7050,
        productsBelow3: 10,
        percentageBelow3: '1%',
        averageRating: 4.78,
        autoPull: false,
        lastPublished: '12/31/1969',
    },
];
const tableImage = [
    { icon: 'web.png', label: 'Website Data', tooltip: 'Information about websites.', colspan: 1 },
    { icon: 'ca_icon.png', label: 'Content Alignment', tooltip: 'co', colspan: 1 },
    { icon: 'dash_icon4.jpg', label: 'Image Data', tooltip: 'Percentage of products with images.', colspan: 2 },
    { icon: 'dash_icon5.jpg', label: 'Video Data', tooltip: 'Percentage of products with videos.', colspan: 1 },
    { icon: 'dash_icon6.jpg', label: 'Review Rating Data', tooltip: 'Review ratings and statistics.', colspan: 5 },
    { icon: 'check.png', label: 'SKU', tooltip: 'Stock Keeping Unit data.', colspan: 1 },
];

// Tooltip Component
const renderTooltip = (message: string) => <Tooltip id="button-tooltip">{message}</Tooltip>;
export default function ProductContent() {
    return (
        < >
            <Table striped bordered hover responsive className="contentTable border border-0 text-center">
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
                        <th>
                            All Products <br /> Since Last
                            <br /> Comparison
                        </th>
                        <th>
                            % Products with <br />
                            5+Images
                        </th>
                        <th>
                            Products without <br /> Images
                        </th>
                        <th>
                            % Products with <br />
                            Videos{' '}
                        </th>
                        <th>
                            Total Number of <br />
                            Review Ratings{' '}
                        </th>
                        <th>
                            Products with <br />
                            average below 3
                        </th>
                        <th>
                            %Products with <br />
                            average below 3
                        </th>
                        <th>
                            Average
                            <br />
                            Rating (out of 5)
                        </th>
                        <th>
                            Auto-pull Daily Set Up
                            <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products out of stock.')}>
                                <InfoIcon width={10} className="me-1" />
                            </OverlayTrigger>
                        </th>
                        <th>
                            Last Date Set Up
                            <br /> SKUs
                            <br />
                            Published{' '}
                            <OverlayTrigger placement="top" overlay={renderTooltip('Percentage of products out of stock.')}>
                                <InfoIcon width={10} className="me-1" />
                            </OverlayTrigger>{' '}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index} className="text-center">
                           <td><Link href="#" className='link-underline-light'>{row.website}</Link></td>
                            <td>
                                <Image src="./images/icons/arrow-up-green-color.png" className="ca-arrow-green-up" width="13"></Image>
                            </td>
                            <td>{row.percentageWithImages}</td>
                            <td>{row.productsWithoutImages}</td>
                            <td>{row.percentageWithVideos}</td>
                            <td>{row.totalReviewRatings}</td>
                            <td>{row.productsBelow3}</td>
                            <td>{row.percentageBelow3}</td>
                            <td>{row.averageRating}</td>
                            <td>{row.autoPull ? <span className='text-success'>✓</span> : <span className='text-danger'>X</span> }</td>
                            <td>{row.lastPublished}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </>
    );
}
