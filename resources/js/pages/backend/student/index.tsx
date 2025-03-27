import { buttonVariants } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { DataTable } from "./server-table";
import { columns } from "./columns";
import { StudentTable } from "@/types";
import { router } from "@inertiajs/react";

export default function Student() {
  const { students } = usePage<{ students: { data: StudentTable[], current_page: number, last_page: number, total: number, per_page: number } }>().props;

  const handlePageChange = (newPage: number) => {
    router.get(route("student.index"), { page: newPage }, { preserveState: true });
  };

  return (    
    <AppLayout breadcrumbs={[{ title: "Student", href: "/student" }]} >
      <Head title="Student" />
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <Link href={route("student.create")} className={buttonVariants({ variant: "outline" })}>
            Create
          </Link>
          <p>Total: {students.total}</p>
        </div>
        <DataTable 
          columns={columns} 
          data={students.data} 
          totalPages={students.last_page} 
          currentPage={students.current_page} 
          onPageChange={handlePageChange} 
        />
      </div>
    </AppLayout>
  );
}
