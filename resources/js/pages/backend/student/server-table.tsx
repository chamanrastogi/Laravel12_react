'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export function DataTable<TData, TValue>({ columns, data, totalPages, currentPage, onPageChange }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        state: { sorting, pagination, globalFilter },
    });
    const maxPagesToShow = 6;
    const startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow);
    return (
        <div className="rounded-md border bg-white p-4 shadow">
            <div className="mb-4 flex items-center justify-between">
                <Input placeholder="Search..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} className="w-64" />
            </div>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">Show</span>
                    <select value={pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))} className="rounded border p-1">
                        {[10, 25, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <span className="text-sm font-semibold">entries</span>
                </div>
                <Input placeholder="Search..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} className="w-64" />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === 'asc' && ' ▲'}
                                        {header.column.getIsSorted() === 'desc' && ' ▼'}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {data.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between py-4">
                <span className="text-sm font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                        First
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                        ❮
                    </Button>
                    {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page + 1 ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onPageChange(page + 1)}
                        >
                            {page + 1}
                        </Button>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        ❯
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
                        Last
                    </Button>
                </div>
            </div>
        </div>
    );
}
