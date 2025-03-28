import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function index() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Seller', href: '/sellers' }]}>
            <Head title="Sellers" />
            <div>
                <h2>My table</h2>
            </div>
        </AppLayout>
    );
}
