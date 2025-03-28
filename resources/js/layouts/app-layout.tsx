import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../css/app.css';
interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, breadcrumbs, ...props }) => {
    const { flash } = usePage<SharedData>().props;
    // Trigger flash message only on change
    useEffect(() => {
        if (flash?.message) {
            toast[flash.status === 'success' ? 'success' : 'error'](flash.message);
        }
    }, [flash]);
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <ToastContainer />
        </AppLayoutTemplate>
    );
};

export default AppLayout;
