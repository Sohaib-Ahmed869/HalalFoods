import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";

const discrepanciesData = [
  {
    issue_no: "23",
    date: "Jan 6, 2022",
    totalAmount: 1000,
    difference: -100,
    fixed: false,
  },
  {
    issue_no: "33",
    date: "Jan 6, 2022",
    totalAmount: 1000,
    difference: -200,
    fixed: false,
  },
  {
    issue_no: "45",
    date: "Jan 6, 2022",
    totalAmount: 1000,
    difference: -430,
    fixed: false,
  },
  {
    issue_no: "64",
    date: "Jan 5, 2022",
    totalAmount: 1000,
    difference: -320,
    fixed: false,
  },
  {
    issue_no: "43",
    date: "Jan 5, 2022",
    totalAmount: 1000,
    difference: -100,
    fixed: false,
  },
  {
    issue_no: "21",
    date: "Jan 5, 2022",
    totalAmount: 1000,
    difference: -500,
    fixed: false,
  },
  {
    issue_no: "34",
    date: "Jan 4, 2022",
    totalAmount: 1000,
    difference: -500,
    fixed: false,
  },
  {
    issue_no: "5",
    date: "Jan 3, 2022",
    totalAmount: 1000,
    difference: -400,
    fixed: false,
  },
  {
    issue_no: "4",
    date: "Jan 3, 2022",
    totalAmount: 1000,
    difference: -400,
    fixed: false,
  },
];

const DiscrepanciesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [allDiscrepancies, setAllDiscrepancies] = useState(
    discrepanciesData.map((item) => ({ ...item, resolution: "" }))
  );
  const [resolution, setResolution] = useState("");

  const pendingDiscrepancies = allDiscrepancies.filter((item) => !item.fixed);
  const fixedDiscrepancies = allDiscrepancies.filter((item) => item.fixed);

  const currentDiscrepancies =
    activeTab === "pending" ? pendingDiscrepancies : fixedDiscrepancies;

  const itemsPerPage = 9;
  const totalPages = Math.ceil(currentDiscrepancies.length / itemsPerPage);

  const handleResolve = (item) => {
    setSelectedIssue(item);
    document.getElementById("resolution_modal").showModal();
  };

  const handleSubmitResolution = (e) => {
    e.preventDefault();
    setAllDiscrepancies((prevDiscrepancies) =>
      prevDiscrepancies.map((item) =>
        item.issue_no === selectedIssue.issue_no
          ? { ...item, fixed: true, resolution: resolution }
          : item
      )
    );
    setResolution("");
    setSelectedIssue(null);
    document.getElementById("resolution_modal").close();
  };

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort className="opacity-40" />;
  };

  // Add sorting function
  const sortData = (data, sortConfig) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  // Add sorting handler
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const processedData = sortData(currentDiscrepancies, sortConfig);

  return (
    <div className="w-full p-6">
      <div className="w-full p-6">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === "pending"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>Pending</span>
            <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-md text-sm">
              {pendingDiscrepancies.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("fixed")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === "fixed"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>Fixed</span>
            <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-md text-sm">
              {fixedDiscrepancies.length}
            </span>
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {activeTab === "pending"
              ? "Pending Discrepancies"
              : "Fixed Discrepancies"}
          </h2>
          <button className="text-gray-500">
            <IoIosInformationCircleOutline size={24} />
          </button>
        </div>

        {/* Filter toggle and clear filters */}
        <div className="flex justify-end items-center mb-4">
          <span className="text-sm text-gray-500">
            Showing {processedData.length} results
          </span>
        </div>

        {/* Table */}
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50"
                  onClick={() => requestSort("issue_no")}
                >
                  <div className="flex items-center gap-2">
                    Issue No.
                    {getSortIcon("issue_no")}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50"
                  onClick={() => requestSort("date")}
                >
                  <div className="flex items-center gap-2">
                    Date
                    {getSortIcon("date")}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50"
                  onClick={() => requestSort("totalAmount")}
                >
                  <div className="flex items-center gap-2">
                    Total Amount
                    {getSortIcon("totalAmount")}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-50"
                  onClick={() => requestSort("difference")}
                >
                  <div className="flex items-center gap-2">
                    Difference
                    {getSortIcon("difference")}
                  </div>
                </th>
                {activeTab === "fixed" && (
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Resolution
                  </th>
                )}
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Status
                </th>
                {activeTab === "pending" && (
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {processedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.issue_no}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.totalAmount}
                  </td>
                  <td className="px-6 py-4 text-sm text-red-500">
                    {item.difference}
                  </td>
                  {activeTab === "fixed" && (
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.resolution}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    {item.fixed ? (
                      <span className="text-green-500 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Fixed
                      </span>
                    ) : (
                      <RxCross2 className="text-red-500" />
                    )}
                  </td>
                  {activeTab === "pending" && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleResolve(item)}
                        className="bg-teal-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-teal-700 transition-colors"
                      >
                        Resolve
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 disabled:opacity-50"
        >
          <IoChevronBackOutline /> Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-md text-sm ${
                currentPage === page
                  ? "bg-teal-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 disabled:opacity-50"
        >
          Next <IoChevronForwardOutline />
        </button>
      </div>

      {/* Resolution Modal */}
      <dialog id="resolution_modal" className="modal">
        <div className="modal-box max-w-md">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">Resolve Discrepancy</h3>

          {selectedIssue && (
            <form onSubmit={handleSubmitResolution} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Issue No.</label>
                  <p className="font-medium">{selectedIssue.issue_no}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Date</label>
                  <p className="font-medium">{selectedIssue.date}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Amount</label>
                  <p className="font-medium">{selectedIssue.totalAmount}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Difference</label>
                  <p className="font-medium text-red-500">
                    {selectedIssue.difference}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">
                  Resolution Note
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-24"
                  placeholder="Explain how this discrepancy was resolved..."
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="modal-action">
                <form method="dialog" className="space-x-2">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() =>
                      document.getElementById("resolution_modal").close()
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-teal-600 text-white hover:bg-teal-700"
                    disabled={!resolution.trim()}
                    onClick={handleSubmitResolution}
                  >
                    Mark as Resolved
                  </button>
                </form>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default DiscrepanciesList;
