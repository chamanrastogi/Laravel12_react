import { useState } from 'react';
import { Dropdown, Nav, NavDropdown, Tab } from 'react-bootstrap';
import ContentAlignment from './content-alignment/contentAlignment';
import FixMyContent from './content-alignment/fixMyContent';

import BuyBox from './buy-box/buyBox';
import Notifications from './notification/notifications';
import PriceMargin from './price-margin/PriceMargin';
import ContentHistory from './product-data/contentHistory';
import ImageCheck from './product-data/imageCheck';
import ProductData from './product-data/ProductData';
import UncheckProducts from './product-data/uncheckProducts';
import AvgMonthlyRank from './ranking/avgMonthlyRank';
import AvgWeeklyRank from './ranking/avgWeeklyRank copy';
import DashboradContent from './ranking/dashboradContent';
import Ranking from './ranking/ranking';
import ReviewRatingDate from './review-rating-data/reviewRatingDate';
import SaleImprovement from './sale-improvement/saleImprovement';
import ShippingHistory from './shipping-history/ShippingHistory';
import StockHistory from './stock-history/stockHistory';
import { AccountProps } from '@/types/accounts';


const Account = ({ webId }: AccountProps) => {
    const [activeKey, setActiveKey] = useState('salesImprovement');
    
    return (
        <>
      
        <Tab.Container activeKey={activeKey} onSelect={(k) => k && setActiveKey(k)}>
            <Nav variant="tabs" className="mb-1">
                <Nav.Item>
                    <Nav.Link eventKey="notification">Notifications</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="salesImprovement">Sales Improvement</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="reviewRatingData">Review Rating Data</Nav.Link>
                </Nav.Item>

                {/* Product Data Dropdown */}
                <Dropdown as={Nav.Item}>
                    <Dropdown.Toggle
                        as={Nav.Link}
                        className={activeKey === 'productData' ||
                            activeKey === 'contentHistory' ||
                            activeKey === 'imageCheck' ||
                            activeKey === 'unmatchedProducts'
                            ? 'active'
                            : ''}
                    >
                        Product Data
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item  onClick={() => setActiveKey('productData')}>Product Data</Dropdown.Item>
                        <Dropdown.Item onClick={() => setActiveKey('contentHistory')}>Content History</Dropdown.Item>
                        <Dropdown.Item onClick={() => setActiveKey('imageCheck')}>Image Check</Dropdown.Item>
                        <Dropdown.Item onClick={() => setActiveKey('unmatchedProducts')}>Unmatched Products</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* Content Alignment Dropdown */}

                <NavDropdown
                    title="Content Alignment"
                    id="contentAlignmentDropdown"
                    className={activeKey === 'contentAlignment' || activeKey === 'fixMyContent' ? 'active' : ''}
                >
                    <NavDropdown.Item onClick={() => setActiveKey('contentAlignment')}>Content Alignment Overview</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setActiveKey('fixMyContent')}>Fix My Content Category Mgmt</NavDropdown.Item>
                </NavDropdown>
                <Nav.Item>
                    <Nav.Link eventKey="buyBox">Buy Box</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="stockHistory">Stock History</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="priceMargin">Price & Margin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="shippingHistory">Shipping history</Nav.Link>
                </Nav.Item>
                {/* Ranking Dropdown */}
                <Dropdown as={Nav.Item}>
                    <Dropdown.Toggle
                        as={Nav.Link}
                        className={activeKey === 'ranking' || activeKey === 'dashboard' || activeKey === 'weeklyRank' || activeKey === 'monthlyRank'
                            ? 'active'
                            : ''}
                    >
                        Ranking
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="ranking">Ranking</Dropdown.Item>
                        <Dropdown.Item eventKey="dashboard">Dashboard</Dropdown.Item>
                        <Dropdown.Item eventKey="weeklyRank">Avg. Weekly Rank</Dropdown.Item>
                        <Dropdown.Item eventKey="monthlyRank">Avg. Monthly Rank</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>

            <Tab.Content>
                <Tab.Pane eventKey="notification">{activeKey === 'notification' && <Notifications />}</Tab.Pane>
                <Tab.Pane eventKey="salesImprovement">{activeKey === 'salesImprovement' && <SaleImprovement />}</Tab.Pane>
                <Tab.Pane eventKey="reviewRatingData">{activeKey === 'reviewRatingData' && <ReviewRatingDate />}</Tab.Pane>
                <Tab.Pane eventKey="productData">{activeKey === 'productData' && <ProductData webId={webId}  />}</Tab.Pane>
                <Tab.Pane eventKey="contentHistory">{activeKey === 'contentHistory' && <ContentHistory />}</Tab.Pane>
                <Tab.Pane eventKey="imageCheck">{activeKey === 'imageCheck' && <ImageCheck />}</Tab.Pane>
                <Tab.Pane eventKey="unmatchedProducts">{activeKey === 'unmatchedProducts' && <UncheckProducts />}</Tab.Pane>
                <Tab.Pane eventKey="contentAlignment">{activeKey === 'contentAlignment' && <ContentAlignment />}</Tab.Pane>
                <Tab.Pane eventKey="fixMyContent">{activeKey === 'fixMyContent' && <FixMyContent />}</Tab.Pane>
                <Tab.Pane eventKey="buyBox">{activeKey === 'buyBox' && <BuyBox />}</Tab.Pane>
                <Tab.Pane eventKey="stockHistory">{activeKey === 'stockHistory' && <StockHistory />}</Tab.Pane>
                <Tab.Pane eventKey="priceMargin">{activeKey === 'priceMargin' && <PriceMargin  />}</Tab.Pane>
                <Tab.Pane eventKey="shippingHistory">{activeKey === 'shippingHistory' && <ShippingHistory />}</Tab.Pane>
                <Tab.Pane eventKey="ranking">{activeKey === 'ranking' && <Ranking />}</Tab.Pane>
                <Tab.Pane eventKey="dashboard">{activeKey === 'dashboard' && <DashboradContent />}</Tab.Pane>
                <Tab.Pane eventKey="weeklyRank">{activeKey === 'weeklyRank' && <AvgWeeklyRank />}</Tab.Pane>
                <Tab.Pane eventKey="monthlyRank">{activeKey === 'monthlyRank' && <AvgMonthlyRank />}</Tab.Pane>
            </Tab.Content>
        </Tab.Container></>
    );
};

export default Account;
