import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SetupNotifications from './SetupNotifications';
import MySiteNotification from './MySiteNotification';
import { useState } from 'react';

export default function Notifications ()  {
    const [activeKey, setActiveKey] = useState('setup');
    return (
        <>
            <Tabs activeKey={activeKey} onSelect={(k) => k && setActiveKey(k)} id="uncontrolled-tab-example" className="border-0 ">
                <Tab eventKey="setup" title="SET UP NOTIFICATIONS">                   
                    {activeKey === 'setup' && <SetupNotifications />}
                </Tab>
                <Tab eventKey="mynotification" title="MY SITE NOTIFICATIONS">
                {activeKey === 'mynotification' && <MySiteNotification />}
                
                </Tab>
            </Tabs>
        </>
    );
};


