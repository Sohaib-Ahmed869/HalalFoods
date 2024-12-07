import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const salesData = [
  {
    customerName: "Jane Cooper",
    invoiceNum: "1241",
    creationDate: "01/02/2024",
    transactionDate: "01/02/2024",
    transactionNum: "493307",
    amount: 413,
    documentNum: "132123",
    method: "Credit Card",
    signature: "28",
    verified: "No",
  },
  {
    customerName: "Floyd Miles",
    invoiceNum: "9432",
    creationDate: "01/02/2024",
    transactionDate: "01/02/2024",
    transactionNum: "493307",
    amount: 463,
    documentNum: "132122",
    method: "Cash",
    signature: "28",
    verified: "No",
  },
  {
    customerName: "Ronald Richards",
    invoiceNum: "02432",
    creationDate: "01/02/2024",
    transactionDate: "01/02/2024",
    transactionNum: "493307",
    amount: 4231,
    documentNum: "132120",
    method: "Credit Card",
    signature: "28",
    verified: "No",
  },
  {
    customerName: "Marvin McKinney",
    invoiceNum: "3234",
    creationDate: "01/02/2024",
    transactionDate: "01/02/2024",
    transactionNum: "493307",
    amount: 4500,
    documentNum: "432112",
    method: "Cash",
    signature: "28",
    verified: "Yes",
  },
  {
    customerName: "Jerome Bell",
    invoiceNum: "989",
    creationDate: "01/02/2024",
    transactionDate: "01/02/2024",
    transactionNum: "493307",
    amount: 200,
    documentNum: "1321232",
    method: "Cash",
    signature: "28",
    verified: "Yes",
  },
  {
    customerName: "Kathryn Murphy",
    invoiceNum: "8932",
    creationDate: "01/02/2024",
    transactionDate: "01/02/2024",
    transactionNum: "493307",
    amount: 2000,
    documentNum: "901231",
    method: "Cash",
    signature: "28",
    verified: "Yes",
  },
  {
    customerName: "Jacob Jones",
    invoiceNum: "3421",
    creationDate: "01/02/2024",
    transactionDate: "01/02/2024",
    transactionNum: "493307",
    amount: 3200,
    documentNum: "234234",
    method: "Cash on Delivery",
    signature: "28",
    verified: "No",
  },
  {
    customerName: "Kristin Watson",
    invoiceNum: "4543",
    creationDate: "01/02/2024",
    transactionDate: "01/02/2024",
    transactionNum: "493307",
    amount: 1320,
    documentNum: "45631",
    method: "Credit Card",
    signature: "28",
    verified: "No",
  },
];

const SalesTable = () => {
  const [sorting, setSorting] = useState([]);

  const columns = [
    {
      accessorKey: "customerName",
      header: "Customer Name",
    },
    {
      accessorKey: "invoiceNum",
      header: "Invoice #",
    },
    {
      accessorKey: "creationDate",
      header: "Creation Date",
    },
    {
      accessorKey: "transactionDate",
      header: "Transaction Date",
    },
    {
      accessorKey: "transactionNum",
      header: "Transaction #",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `$${row.original.amount}`,
    },
    {
      accessorKey: "documentNum",
      header: "Document #",
    },
    {
      accessorKey: "method",
      header: "Method",
    },
    {
      accessorKey: "signature",
      header: "Signature",
    },
    {
      accessorKey: "verified",
      header: "Verified",
      cell: ({ row }) => (
        <span
          className={
            row.original.verified === "Yes" ? "text-green-500" : "text-red-500"
          }
        >
          {row.original.verified}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: salesData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales</h1>
        <div className="flex gap-4 items-center">
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            Import Data
          </button>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <button className="flex items-center gap-2">
              Newest
              <BsChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              {table.getFlatHeaders().map((header) => (
                <th
                  key={header.id}
                  className="pb-4 cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() &&
                      (header.column.getIsSorted() === "asc" ? (
                        <BsChevronUp className="w-4 h-4" />
                      ) : (
                        <BsChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div>
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            salesData.length
          )}{" "}
          of {salesData.length} entries
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="px-2 py-1 rounded hover:bg-gray-100"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            &lt;
          </button>
          {Array.from(
            { length: Math.min(5, table.getPageCount()) },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-1 rounded ${
                pageNumber === table.getState().pagination.pageIndex + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => table.setPageIndex(pageNumber - 1)}
            >
              {pageNumber}
            </button>
          ))}
          {table.getPageCount() > 5 && <span>...</span>}
          {table.getPageCount() > 5 && (
            <button
              className="px-3 py-1 rounded hover:bg-gray-100"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              {table.getPageCount()}
            </button>
          )}
          <button
            className="px-2 py-1 rounded hover:bg-gray-100"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
