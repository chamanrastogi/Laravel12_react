import AppLayout from "@/layouts/app-layout";
import { Head,  usePage } from "@inertiajs/react";
import { DataTable } from "./server-table";
import { columns } from "./columns";
import { SellerTable } from "@/types";
import { router } from "@inertiajs/react";
import { Button } from 'primereact/button';
export default function Sellers() {
  const { sellers } = usePage<{ sellers: { data: SellerTable[], current_page: number, last_page: number, total: number, per_page: number } }>().props;

  const handlePageChange = (newPage: number) => {
    router.get(route("sellers.index"), 
    { page: newPage }, 
    { 
      preserveState: true, 
      preserveScroll: true, 
      only: ["sellers"] // Only fetch sellers to prevent full reload
    }
  );
  };

  return (    
    <AppLayout breadcrumbs={[{ title: "Seller", href: "/sellers" }]} >
      <Head title="Sellers" />
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
        <Button label="Submit" />
         
        </div>
        <DataTable 
          columns={columns} 
          data={sellers.data} 
          totalPages={sellers.last_page} 
          currentPage={sellers.current_page} 
          onPageChange={handlePageChange} 
          
        />
      </div>
    </AppLayout>
  );
}
