import AppLayout from "@/layouts/app-layout";
import { Employee } from "@/types";
import { Head } from "@inertiajs/react";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useState } from "react";

const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState<1 | -1>(1);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);

    // Fetch employees from API
    const fetchEmployees = async () => {
        setLoading(true);
        const response = await fetch(
            `/api/employees?search=${search}&sortField=${sortField}&sortOrder=${sortOrder === 1 ? "asc" : "desc"}&page=${page}`
        );
        const data = await response.json();
        setEmployees(data.data);
        setTotalRecords(data.total);
        setLoading(false);
    };

    useEffect(() => {
        fetchEmployees();
    }, [search, sortField, sortOrder, page]);

    const onSort = (e: DataTableSortEvent) => {
        setSortField(e.sortField);
        setSortOrder(e.sortOrder === 1 ? 1 : -1);
    };

    const onPageChange = (e: PaginatorPageChangeEvent) => {
        setPage(e.page + 1);
    };

    return (
        <AppLayout breadcrumbs={[{ title: "Employees", href: "/employees" }]}>
            <Head title="Employees List" />
            <div className="card p-5">
                <h2 className="mb-4 text-lg font-semibold">Employee List</h2>

                <div className="mb-3 flex gap-2">
                    <InputText
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search employees..."
                        className="p-inputtext-sm w-full md:w-1/3"
                    />
                </div>

                <DataTable
                    value={employees}
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
                    <Column field="name" header="Name" sortable />
                    <Column field="email" header="Email" sortable />
                    <Column field="position" header="Position" sortable />
                    <Column field="salary" header="Salary" sortable />
                </DataTable>

                <Paginator
                    first={(page - 1) * 10}
                    rows={10}
                    totalRecords={totalRecords}
                    onPageChange={onPageChange}
                />
            </div>
        </AppLayout>
    );
};

export default Employees;
