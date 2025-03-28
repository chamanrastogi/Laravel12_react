import { buttonVariants } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { StudentTable } from "@/types";

const Students = () => {
    const { students } = usePage<{ students: StudentTable[] }>().props;
  return (
    <AppLayout breadcrumbs={[{ title: "Student", href: "/student" }]}>
    <Head title="Student" />
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Link href={route("student.create")} className={buttonVariants({ variant: "outline" })}>
          Create
        </Link>
       
      </div>
      <DataTable columns={columns} data={students} />
    </div>
  </AppLayout>
  );
};

export default Students;