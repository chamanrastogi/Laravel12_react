import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const notifications = () => {
    return (
        <>
            <Tabs defaultActiveKey="setup" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="setup" title="SET UP NOTIFICATIONS">
                    SET UP NOTIFICATIONS
                </Tab>
                <Tab eventKey="mynotification" title="MY SITE NOTIFICATIONS">
                    MY SITE NOTIFICATIONS
                </Tab>
            </Tabs>
        </>
    );
};

export default notifications;
