import Footer from "@/components/front/footer";
import Nav from "@/components/front/nav";
import 'primereact/resources/themes/lara-light-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { type SharedData } from '@/types';
import React, { ReactNode, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { usePage } from "@inertiajs/react";


interface Props {
    children: ReactNode;
}

const AppFrontLayout: React.FC<Props> = ({ children }) => {
    const { flash } = usePage<SharedData>().props;
    // Trigger flash message only on change
    useEffect(() => {
        if (flash?.message) {
            toast[flash.status === 'success' ? 'success' : 'error'](flash.message);
        }
    }, [flash]);
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
           <Nav/>

            {/* Main Content */}
            <div id="mainArea">{children}</div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
            {/* <ToastContainer /> */}
            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default AppFrontLayout;
