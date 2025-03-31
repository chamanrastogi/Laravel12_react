import React, { useState } from "react";
import { Tab, Nav, Dropdown } from "react-bootstrap";
import Notifications from './notification/notifications';

const CustomNavTabs = () => {
  const [activeKey, setActiveKey] = useState("salesImprovement");

  return (
    <Tab.Container activeKey={activeKey} onSelect={(k) => k && setActiveKey(k)}>
      <Nav variant="tabs" className="mb-3">
      <Nav.Item>
          <Nav.Link eventKey="notification">
            Notifications
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="salesImprovement">Sales Improvement</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="reviewRatingData">Review Rating Data</Nav.Link>
        </Nav.Item>

        {/* Product Data Dropdown */}
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle as={Nav.Link}>Product Data</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="contentHistory">Content History</Dropdown.Item>
            <Dropdown.Item eventKey="imageCheck">Image Check</Dropdown.Item>
            <Dropdown.Item eventKey="unmatchedProducts">Unmatched Products</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Content Alignment Dropdown */}
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle as={Nav.Link}>Content Alignment</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="fixMyContent">Fix My Content Category Mgmt</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

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
          <p>Sales Improvement Content</p>
        </Tab.Pane>
        <Tab.Pane eventKey="reviewRatingData">
          <p>Review Rating Data Content</p>
        </Tab.Pane>
        <Tab.Pane eventKey="contentHistory">
          <p>Content History</p>
        </Tab.Pane>
        <Tab.Pane eventKey="imageCheck">
          <p>Image Check</p>
        </Tab.Pane>
        <Tab.Pane eventKey="unmatchedProducts">
          <p>Unmatched Products</p>
        </Tab.Pane>
        <Tab.Pane eventKey="fixMyContent">
          <p>Fix My Content Category Mgmt</p>
        </Tab.Pane>
        <Tab.Pane eventKey="buyBox">
          <p>Buy Box Content</p>
        </Tab.Pane>
        <Tab.Pane eventKey="stockHistory">
          <p>Stock History Content</p>
        </Tab.Pane>
        <Tab.Pane eventKey="dashboard">
          <p>Dashboard Content</p>
        </Tab.Pane>
        <Tab.Pane eventKey="weeklyRank">
          <p>Avg. Weekly Rank</p>
        </Tab.Pane>
        <Tab.Pane eventKey="monthlyRank">
          <p>Avg. Monthly Rank</p>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default CustomNavTabs;