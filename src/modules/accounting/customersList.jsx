import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { BiChevronDown, BiChevronRight, BiSearch } from 'react-icons/bi';

const customerData = [
  {
    customerName: "Jane Cooper",
    address: "123 Lane",
    phoneNumber: "(225) 555-0118",
    transactionsPending: "2($1000)",
    salesToDate: "$1000",
    transactions: [
      { invoiceId: "1231242", total: "$1000", paid: "No", paidToDate: "$0" },
      { invoiceId: "543221", total: "$1000", paid: "No", paidToDate: "$0" }
    ]
  },
  {
    customerName: "Floyd Miles",
    address: "900 Lane",
    phoneNumber: "(205) 555-0100",
    transactionsPending: "2($1000)",
    salesToDate: "$2000",
    transactions: [
      { invoiceId: "654321", total: "$2000", paid: "No", paidToDate: "$0" }
    ]
  },
  {
    customerName: "Ronald Richards",
    address: "Street 53",
    phoneNumber: "(302) 555-0107",
    transactionsPending: "2($1000)",
    salesToDate: "$2000",
    transactions: [
      { invoiceId: "789012", total: "$2000", paid: "No", paidToDate: "$0" }
    ]
  },
  {
    customerName: "Marvin McKinney",
    address: "Sector A",
    phoneNumber: "(252) 555-0126",
    transactionsPending: "2($1000)",
    salesToDate: "$2000",
    transactions: [
      { invoiceId: "345678", total: "$2000", paid: "Yes", paidToDate: "$2000" }
    ]
  },
  {
    customerName: "Jerome Bell",
    address: "Googleland",
    phoneNumber: "(629) 555-0129",
    transactionsPending: "2($1000)",
    salesToDate: "$2000",
    transactions: [
      { invoiceId: "901234", total: "$2000", paid: "No", paidToDate: "$0" }
    ]
  },
  {
    customerName: "Kathryn Murphy",
    address: "MicrosoftInc",
    phoneNumber: "(406) 555-0120",
    transactionsPending: "2($1000)",
    salesToDate: "$2000",
    transactions: [
      { invoiceId: "567890", total: "$2000", paid: "No", paidToDate: "$0" }
    ]
  }
];

const CustomerList = () => {
  const [expanded, setExpanded] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = [
    {
      id: 'expander',
      header: () => null,
      cell: ({ row }) => (
        <button
          onClick={() => row.toggleExpanded()}
          className="pr-4"
        >
          {row.getIsExpanded() ? (
            <BiChevronDown className="w-5 h-5" />
          ) : (
            <BiChevronRight className="w-5 h-5" />
          )}
        </button>
      ),
    },
    {
      accessorKey: 'customerName',
      header: 'Customer Name'
    },
    {
      accessorKey: 'address',
      header: 'Address'
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone Number'
    },
    {
      accessorKey: 'transactionsPending',
      header: 'Transactions Pending'
    },
    {
      accessorKey: 'salesToDate',
      header: 'Sales to Date'
    }
  ];

  const table = useReactTable({
    data: customerData,
    columns,
    state: {
      expanded,
      globalFilter,
    },
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    getSubRows: row => row.transactions,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  
  const generatePageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust range if at edges
    if (currentPage <= 2) {
      end = Math.min(totalPages - 1, 4);
    }
    if (currentPage >= totalPages - 1) {
      start = Math.max(2, totalPages - 3);
    }

    // Add ellipsis before range if needed
    if (start > 2) {
      pages.push('...');
    }

    // Add range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis after range if needed
    if (end < totalPages - 1) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">All Customers</h1>
        <p className="text-sm text-green-500">Active Members</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-64"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Sort by:</span>
          <select className="border rounded-lg px-3 py-2">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {table.getFlatHeaders().map(header => (
                <th key={header.id} className="text-left px-6 py-4 text-sm text-gray-500">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => {
              if (row.original && !row.original.invoiceId) {
                // Parent row
                return (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                );
              } else if (row.original && row.original.invoiceId) {
                // Transaction row
                return (
                  <tr key={row.id} className="bg-gray-50 text-sm">
                    <td colSpan={2} className="pl-16 py-3">
                      Invoice# {row.original.invoiceId}
                    </td>
                    <td className="py-3">Total: {row.original.total}</td>
                    <td className="py-3">Paid: {row.original.paid}</td>
                    <td colSpan={2} className="py-3">
                      Paid to Date: {row.original.paidToDate}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div>
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            customerData.length
          )}{' '}
          of {customerData.length} entries
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`px-2 py-1 rounded ${!table.getCanPreviousPage() ? 'text-gray-300' : 'hover:bg-gray-100'}`}
          >
            &lt;
          </button>
          
          {generatePageNumbers().map((pageNum, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (typeof pageNum === 'number') {
                  table.setPageIndex(pageNum - 1);
                }
              }}
              className={`px-3 py-1 rounded ${
                pageNum === currentPage
                  ? 'bg-blue-600 text-white'
                  : pageNum === '...'
                  ? ''
                  : 'hover:bg-gray-100'
              }`}
              disabled={pageNum === '...'}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`px-2 py-1 rounded ${!table.getCanNextPage() ? 'text-gray-300' : 'hover:bg-gray-100'}`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;