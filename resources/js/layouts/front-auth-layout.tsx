import 'primeicons/primeicons.css'; // Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { ReactNode } from "react";
import '../../css/style.css';

interface Props {
    children: ReactNode;
}

const AppFrontAuthLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
           

            {/* Main Content */}
            <div >{children}</div>

            {/* Footer */}
           
        </div>
    );
};

export default AppFrontAuthLayout;
