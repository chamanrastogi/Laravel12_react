import AppLayout from "@/layouts/app-layout";
import { SellerTable } from "@/types";
import { Head } from "@inertiajs/react";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useState } from "react";


export default function Sellers()  {
    const [sellers, setsellers] = useState<SellerTable[]>([]);
    const [seller, setSeller] = useState("");
    const [city, setCity] = useState("");
    const [crawler, setCraweler] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState<1 | -1>(1);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    // Fetch sellers from API
    const fetchsellers = async () => {
        setLoading(true);
        const response = await fetch(
            `/api/sellers?seller=${seller}&city=${city}&crawler=${crawler}&sortField=${sortField}&sortOrder=${sortOrder === 1 ? "asc" : "desc"}&page=${page}`
        );
        const data = await response.json();
        setsellers(data.data);
        setTotalRecords(data.total);
        setLoading(false);
    };

    useEffect(() => {
        fetchsellers();
    }, [seller,city,crawler, sortField, sortOrder, page]);

    const onSort = (e: DataTableSortEvent) => {
        setSortField(e.sortField);
        setSortOrder(e.sortOrder === 1 ? 1 : -1);
    };

    const onPageChange = (e: PaginatorPageChangeEvent) => {
        setPage(e.page + 1);
    };

    return (
        <AppLayout breadcrumbs={[{ title: "sellers", href: "/sellers" }]}>
            <Head title="sellers List" />
            <div className="card p-5">
                <h2 className="mb-4 text-lg font-semibold">Employee List</h2>

                <div className="mb-3 flex gap-2">
                    <InputText
                        value={seller}
                        onChange={(e) => setSeller(e.target.value)}
                        placeholder="Search sellers..."
                        className="p-inputtext-sm w-full md:w-1/3"
                    />
                     <InputText
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Search City..."
                        className="p-inputtext-sm w-full md:w-1/3"
                    />
                     <InputText
                        value={crawler}
                        onChange={(e) => setCraweler(e.target.value)}
                        placeholder="Search Crawler..."
                        className="p-inputtext-sm w-full md:w-1/3"
                    />
                </div>

                <DataTable
                    value={sellers}
                    lazy
                    paginator={false}
                    onSort={onSort}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    stripedRows
                    loading={loading}
                    className="p-datatable-sm"
                >
                    <Column field="id" header="ID" sortable />
                    <Column field="seller" header="Seller" sortable />
                    <Column field="seller_city" header="City" sortable />
                    <Column field="seller_state" header="State" sortable />
                    <Column field="crawler" header="Crawler" sortable />
                </DataTable>

                <Paginator
                    first={(page - 1) * 10}
                    rows={10}
                    totalRecords={totalRecords}
                    onPageChange={onPageChange}
                />
                <p>TotalRecords:{totalRecords}</p>
            </div>
        </AppLayout>
    );
};

