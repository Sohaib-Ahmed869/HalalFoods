import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

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
  const [discrepancies, setDiscrepancies] = useState(discrepanciesData);
  const [resolution, setResolution] = useState("");

  const itemsPerPage = 9;
  const totalPages = Math.ceil(discrepancies.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleResolve = (item) => {
    setSelectedIssue(item);
    document.getElementById("resolution_modal").showModal();
  };

  const handleSubmitResolution = (e) => {
    e.preventDefault();
    setDiscrepancies((prevDiscrepancies) =>
      prevDiscrepancies
        .map((item) =>
          item.issue_no === selectedIssue.issue_no
            ? { ...item, fixed: true }
            : item
        )
        .filter((item) => !item.fixed)
    );
    setResolution("");
    setSelectedIssue(null);
    document.getElementById("resolution_modal").close();
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Discrepancies found <span className="text-red-800 bg-red-100 px-2 py-1 rounded-md">{discrepancies.length}</span>
        </h2>
        <button className="text-gray-500">
          <IoIosInformationCircleOutline size={24} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Issue No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Difference
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Fixed
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {discrepancies.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.issue_no}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {item.totalAmount}
                </td>
                <td className="px-6 py-4 text-sm text-red-500">
                  {item.difference}
                </td>
                <td className="px-6 py-4">
                  <RxCross2 className="text-red-500" />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleResolve(item)}
                    className="bg-teal-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-teal-700 transition-colors"
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
