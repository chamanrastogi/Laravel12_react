import AppFrontLayout from "@/layouts/front-layout";
import { Employee } from "@/types";
import { Head } from "@inertiajs/react";
import "primeicons/primeicons.css";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Table() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState<1 | 0 | -1>(1);
    const [loading, setLoading] = useState(false);

    const hasFetched = useRef(false); // prevent refetch on reload

    // Fetch data only once
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchEmployees();
        }
    }, []); // Only once on first render

    // Manual data fetch
    const fetchEmployees = async (params: {
        page?: number;
        search?: string;
        sortField?: string;
        sortOrder?: "asc" | "desc";
    } = {}) => {
        setLoading(true);
        try {
            const response = await axios.get(route("employees.table"), {
                params: {
                    page: params.page || currentPage,
                    search: params.search ?? search,
                    sortField: params.sortField ?? sortField,
                    sortOrder: params.sortOrder ?? (sortOrder === 1 ? "asc" : sortOrder === -1 ? "desc" : undefined),
                },
            });

            const data = response.data.employees;
            setEmployees(data.data);
            setCurrentPage(data.current_page);
            setPerPage(data.per_page);
            setTotal(data.total);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const handleSearchChange = (value: string) => {
        setSearch(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            fetchEmployees({ search: value, page: 1 });
        }, 300);
    };

    const onPageChange = (e: PaginatorPageChangeEvent) => {
        fetchEmployees({ page: e.page + 1 });
    };

    const onSort = (e: DataTableSortEvent) => {
        const newSortOrder = e.sortOrder === 1 ? "asc" : e.sortOrder === -1 ? "desc" : undefined;
        setSortField(e.sortField);
        setSortOrder(e.sortOrder ?? 1);
        fetchEmployees({ sortField: e.sortField, sortOrder: newSortOrder });
    };

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
        <AppFrontLayout>
            <Head title="Table" />
            <div className="p-5">
                <h2 className="text-lg font-semibold mb-4">Employee List</h2>

                <div className="mb-3 flex gap-2">
                    <InputText
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
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
                    <Column header="Actions" body={actionTemplate} />
                </DataTable>

                <Paginator
                    first={(currentPage - 1) * perPage}
                    rows={perPage}
                    totalRecords={total}
                    onPageChange={onPageChange}
                />
            </div>
        </AppFrontLayout>
    );
}
