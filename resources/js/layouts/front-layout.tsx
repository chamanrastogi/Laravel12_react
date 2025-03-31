import Footer from "@/components/front/footer";
import Nav from "@/components/front/nav";
import 'primereact/resources/themes/viva-light/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { ReactNode } from "react";
import "font-awesome/css/font-awesome.min.css";
import '../../css/style.css';

interface Props {
    children: ReactNode;
}

const AppFrontLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
           <Nav/>

            {/* Main Content */}
            <div id="mainArea">{children}</div>

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default AppFrontLayout;
