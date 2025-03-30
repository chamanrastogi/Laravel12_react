import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import 'font-awesome/css/font-awesome.min.css';
import '../../css/app.css';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'primereact/resources/themes/mira/theme.css'; // Theme

import 'primeicons/primeicons.css'; // Icons

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, ...props }) => {
    const { flash } = usePage<SharedData>().props;
    // Trigger flash message only on change
    useEffect(() => {
        if (flash?.message) {
            toast[flash.status === 'success' ? 'success' : 'error'](flash.message);
        }
    }, [flash]);
    return (
        <AppLayoutTemplate  {...props}>
            {children}
            <ToastContainer />
        </AppLayoutTemplate>
    );
};

export default AppLayout;
