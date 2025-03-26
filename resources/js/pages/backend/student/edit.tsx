
import AppLayout from '@/layouts/app-layout';
import {  Student, BreadcrumbItem, StudentTable } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import StudentForm from './student-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit',
        href: '/edit',
    },
];

export default function Edit() {
    const { student } = usePage<{ student: StudentTable }>().props;
   
  
    const { data, setData, put, processing, errors } = useForm<Student>({
        name: student.name,
        email: student.email,
        age: student.age,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append("name", data.name);
        payload.append("email", data.email);
        payload.append("age", data.age);
       

        put(route('student.update', student.id), {
           // onFinish: () => reset('name', 'email', 'age'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Student" />
            <section className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                    
                    <StudentForm
                        data={data}
                        errors={errors}
                        onSubmit={submit}
                        setData={setData}
                        processing={processing}
                        buttonText="Update Student"
                    />
                </div>
            </section>
        </AppLayout>
    );
}
