import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SetupNotifications from './SetupNotifications';
import MySiteNotification from './MySiteNotification';

export default function Notifications ()  {
    return (
        <>
            <Tabs defaultActiveKey="setup" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="setup" title="SET UP NOTIFICATIONS">
                    <SetupNotifications/>
                </Tab>
                <Tab eventKey="mynotification" title="MY SITE NOTIFICATIONS">
                    <MySiteNotification/>
                </Tab>
            </Tabs>
        </>
    );
};


