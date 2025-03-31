import AppFrontLayout from '@/layouts/front-layout';
import { Head } from '@inertiajs/react';

export default function Index() {
    
    return (
        <AppFrontLayout>
            <Head title="Home" />
            <h2>Home Page</h2>
        </AppFrontLayout>
    );
}
