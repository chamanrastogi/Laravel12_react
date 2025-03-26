import AppLayout from '@/layouts/app-layout';
import { Student, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import StudentForm from './student-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create',
        href: '/create',
    },
];


export default function Create() {
   
    const { data, setData, post, processing, errors, reset } = useForm<Student>({
        name: '',
        email: '',
        age: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('student.store'), {
            onFinish: () => reset('name', 'email', 'age'),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Student" />
            <section className="flex min-h-screen items-center justify-center bg-gray-100">
               
                <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                
                    <StudentForm
                        data={data}
                        errors={errors}
                        onSubmit={submit}
                        setData={setData}
                        processing={processing}
                        buttonText="Create Student"
                    />
                </div>
            </section>
        </AppLayout>
    );
}
