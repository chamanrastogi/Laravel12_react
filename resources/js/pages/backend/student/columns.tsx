import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@inertiajs/react";
import { StudentTable } from "@/types";

export const columns: ColumnDef<StudentTable>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "age", header: "Age" },
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2 justify-end">
        <Link
          href={route("student.edit", row.original.id)}
          className="fa fa-pencil transition"
        ></Link>
        <Link
          href={route("student.delete", row.original.id)}
          className="fa fa-trash transition"
        ></Link>
      </div>
    ),
  },
];