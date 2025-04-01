import { useState } from 'react';
import { Dropdown, Nav, NavDropdown, Tab } from 'react-bootstrap';
import ContentAlignment from './content-alignment/contentAlignment';
import FixMyContent from './content-alignment/fixMyContent';

import ContentHistory from './product-data/contentHistory';
import ImageCheck from './product-data/imageCheck';
import UncheckProducts from './product-data/uncheckProducts';
import ReviewRatingDate from './review-rating-data/reviewRatingDate';
import SaleImprovement from './sale-improvement/saleImprovement';
import BuyBox from './buy-box/buyBox';
import StockHistory from './stock-history/stockHistory';
import DashboradContent from './ranking/dashboradContent';
import AvgWeeklyRank from './ranking/avgWeeklyRank copy';
import AvgMonthlyRank from './ranking/avgMonthlyRank';
import Notifications from './notification/notifications';


const CustomNavTabs = () => {
    const [activeKey, setActiveKey] = useState('salesImprovement');

    return (
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
                    <Dropdown.Toggle as={Nav.Link} className={activeKey === 'contentHistory' || activeKey === 'imageCheck' || activeKey === 'unmatchedProducts' ? 'active' : ''}>Product Data</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setActiveKey('contentHistory')}>Content History</Dropdown.Item>
                        <Dropdown.Item onClick={() => setActiveKey('imageCheck')}>Image Check</Dropdown.Item>
                        <Dropdown.Item onClick={() => setActiveKey('unmatchedProducts')}>Unmatched Products</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* Content Alignment Dropdown */}

                <NavDropdown title="Content Alignment" id="contentAlignmentDropdown">
                    <NavDropdown.Item 
                        onClick={() => setActiveKey('contentAlignment')}
                    >
                        Content Alignment Overview
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                        onClick={() => setActiveKey('fixMyContent')}
                    >
                        Fix My Content Category Mgmt
                    </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item>
                    <Nav.Link eventKey="buyBox">Buy Box</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="stockHistory">Stock History</Nav.Link>
                </Nav.Item>

                {/* Ranking Dropdown */}
                <Dropdown as={Nav.Item}>
                    <Dropdown.Toggle as={Nav.Link}>Ranking</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="dashboard">Dashboard</Dropdown.Item>
                        <Dropdown.Item eventKey="weeklyRank">Avg. Weekly Rank</Dropdown.Item>
                        <Dropdown.Item eventKey="monthlyRank">Avg. Monthly Rank</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>

            <Tab.Content>
                <Tab.Pane eventKey="notification">
                 <Notifications/>
                </Tab.Pane>
                <Tab.Pane eventKey="salesImprovement">
                    <SaleImprovement />
                </Tab.Pane>
                <Tab.Pane eventKey="reviewRatingData">
                    <ReviewRatingDate />
                </Tab.Pane>
                <Tab.Pane eventKey="contentHistory">
                    <ContentHistory />
                </Tab.Pane>
                <Tab.Pane eventKey="imageCheck">
                    <ImageCheck />
                </Tab.Pane>
                <Tab.Pane eventKey="unmatchedProducts">
                    <UncheckProducts />
                </Tab.Pane>
                <Tab.Pane eventKey="contentAlignment">
                    <ContentAlignment />
                </Tab.Pane>
                <Tab.Pane eventKey="fixMyContent">
                    <FixMyContent />
                </Tab.Pane>
                <Tab.Pane eventKey="buyBox">
                   <BuyBox/>
                </Tab.Pane>
                <Tab.Pane eventKey="stockHistory">
                   <StockHistory/>
                </Tab.Pane>
                <Tab.Pane eventKey="dashboard">
                <DashboradContent/>
                </Tab.Pane>
                <Tab.Pane eventKey="weeklyRank">
                    <AvgWeeklyRank/>
                </Tab.Pane>
                <Tab.Pane eventKey="monthlyRank">
                    <AvgMonthlyRank/>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    );
};

export default CustomNavTabs;
