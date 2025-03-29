import AppLayout from "@/layouts/app-layout";
import { Employee } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import "primeicons/primeicons.css";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { useState, useEffect } from "react";

const Employees = () => {
    const { employees, filters } = usePage<{
        employees: {
            data: Employee[];
            current_page: number;
            per_page: number;
            total: number;
        };
        filters: { search?: string; sortField?: string; sortOrder?: "asc" | "desc" };
    }>().props;

    const [search, setSearch] = useState(filters.search || "");
    const [sortField, setSortField] = useState(filters.sortField || "");
    const [sortOrder, setSortOrder] = useState(filters.sortOrder === "desc" ? -1 : 1);
    const [loading] = useState(false);

    // Handle search with debounce effect
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("employees.index"),
                { search },
                { preserveState: true, preserveScroll: true, only: ["employees"] }
            );
        }, 300); // Delay for better performance

        return () => clearTimeout(timeout);
    }, [search]);

    // Handle pagination
    const onPageChange = (e: PaginatorPageChangeEvent) => {
        router.get(
            route("employees.index"),
            { page: e.page + 1 },
            { preserveState: true, preserveScroll: true, only: ["employees"] }
        );
    };

    // Handle sorting
    const onSort = (e: DataTableSortEvent) => {
        const newSortOrder = e.sortOrder === 1 ? "asc" : "desc";
        setSortField(e.sortField);
        setSortOrder(e.sortOrder ?? 1); // Store as a number with fallback

        router.get(
            route("employees.index"),
            {
                sortField: e.sortField,
                sortOrder: newSortOrder, // Send 'asc' or 'desc' to backend
            },
            { preserveState: true, preserveScroll: true, only: ["employees"] }
        );
    };

    // Action Buttons Column
    const actionTemplate = (rowData: Employee) => (
        <div className="flex gap-2">
            <button
                className="p-button p-button-sm p-button-text"
                onClick={() => alert(`Editing ${rowData.name}`)}
            >
                ✏️ Edit
            </button>
            <button
                className="p-button p-button-sm p-button-danger p-button-text"
                onClick={() => alert(`Deleting ${rowData.name}`)}
            >
                ❌ Delete
            </button>
        </div>
    );

    return (
        <AppLayout breadcrumbs={[{ title: "Employees", href: "/employees" }]}>
            <Head title="Employees List" />
            <div className="card p-5">
                <h2 className="text-lg font-semibold mb-4">Employee List</h2>

                {/* Search Bar */}
                <div className="mb-3 flex gap-2">
                    <InputText
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search employees..."
                        className="p-inputtext-sm w-full md:w-1/3"
                    />
                </div>

                {/* Data Table with Lazy Loading */}
                <DataTable
                    value={employees.data}
                    lazy
                    paginator={false}
                    onSort={onSort}
                    sortField={sortField}
                    sortOrder={sortOrder as 1 | 0 | -1} // Explicitly cast to SortOrder
                    stripedRows
                    loading={loading}
                    className="p-datatable-sm"
                >
                    <Column field="id" header="ID" sortable />
                    <Column field="name" header="Name" sortable />
                    <Column field="email" header="Email" sortable />
                    <Column field="position" header="Position" sortable />
                    <Column field="salary" header="Salary" sortable />
                    <Column header="Actions" body={actionTemplate} />
                </DataTable>

                {/* Pagination */}
                <Paginator
                    first={(employees.current_page - 1) * employees.per_page}
                    rows={employees.per_page}
                    totalRecords={employees.total}
                    onPageChange={onPageChange}
                />
            </div>
        </AppLayout>
    );
};

export default Employees;
