import React, { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Search, Download, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const invoiceData = [
  {
    invoiceNumber: "INV-2024-001",
    date: "2024-01-15",
    customerName: "Tech Solutions Inc",
    total: 2459.99,
    paid: 2459.99,
    balance: 0,
    dueDate: "2024-02-15",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    items: 12
  },
  {
    invoiceNumber: "INV-2024-002",
    date: "2024-01-16",
    customerName: "Global Retailers",
    total: 1899.50,
    paid: 1000.00,
    balance: 899.50,
    dueDate: "2024-02-16",
    status: "Partial",
    paymentMethod: "Credit Card",
    items: 8
  },
  {
    invoiceNumber: "INV-2024-003",
    date: "2024-01-17",
    customerName: "City Services Ltd",
    total: 3299.99,
    paid: 0,
    balance: 3299.99,
    dueDate: "2024-02-17",
    status: "Pending",
    paymentMethod: "Pending",
    items: 15
  },
  // Add more sample data as needed
];

const InvoiceList = () => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = [
    {
      accessorKey: 'invoiceNumber',
      header: 'Invoice #',
      cell: info => (
        <div className="text-blue-600 hover:text-blue-800 cursor-pointer">
          {info.getValue()}
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'customerName',
      header: 'Customer',
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: info => info.getValue().toLocaleString(),
    },
    {
      accessorKey: 'total',
      header: 'Total Amount',
      cell: info => `$${info.getValue().toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      accessorKey: 'paid',
      header: 'Paid',
      cell: info => `$${info.getValue().toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: info => `$${info.getValue().toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => (
        <span className={`px-3 py-1 rounded-full text-sm ${
          info.getValue() === 'Paid' ? 'bg-green-100 text-green-800' :
          info.getValue() === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'paymentMethod',
      header: 'Payment Method',
    },
  ];

  const table = useReactTable({
    data: invoiceData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Invoices</h1>
        <p className="text-gray-600">View and manage all imported invoices</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Table Controls */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search invoices..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
            </div>
            <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {table.getFlatHeaders().map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() && (
                        header.column.getIsSorted() === 'asc'
                          ? <ChevronUp className="w-4 h-4" />
                          : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 text-sm text-gray-600">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getPrePaginationRowModel().rows.length
            )}{' '}
            of {table.getPrePaginationRowModel().rows.length} results
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            {Array.from(
              { length: Math.min(5, table.getPageCount()) },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`px-3 py-1 border rounded ${
                  pageNumber === table.getState().pagination.pageIndex + 1
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => table.setPageIndex(pageNumber - 1)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;