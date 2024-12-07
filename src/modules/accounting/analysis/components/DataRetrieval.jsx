import React, { useState } from "react";
import { BiCart } from "react-icons/bi";
import { BiPurchaseTag } from "react-icons/bi";
import { SlGraph } from "react-icons/sl";
import { BiCloudUpload } from "react-icons/bi";
import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import LoadingModal from "./isLoading";
const cardData = [
  {
    row: [
      {
        title: "Products Purchased",
        value: "20,000$",
        bgColor: "bg-blue-500",
        icon: <BiCart />,
      },
      {
        title: "Products Sold",
        value: "20,000$",
        bgColor: "bg-teal-600",
        icon: <BiPurchaseTag />,
      },
      {
        title: "Profit/Loss Difference",
        value: "+23,100",
        bgColor: "bg-green-500",
        icon: <SlGraph />,
      },
    ],
  },
  {
    row: [
      {
        title: "Qty Purchased",
        value: "3,000",
        bgColor: "bg-blue-500",
        icon: <BiCart />,
      },
      {
        title: "Qty Sold",
        value: "2,100",
        bgColor: "bg-teal-600",
        icon: <BiPurchaseTag />,
      },
      {
        title: "Difference",
        value: "-9000",
        bgColor: "bg-red-900",
        icon: <SlGraph />,
      },
    ],
  },
];

const resultsData = [
  {
    label: "Profit",
    value: "231000",
  },
  {
    label: "Money Received",
    value: "220000",
  },
  {
    label: "Value Added Tax",
    value: "23001",
  },
  {
    label: "Payments pending",
    value: "2000",
    highlight: "↑ 5.90%",
  },
];

const DataRetrieval = ({ start, end, setStep, step }) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("upload_modal").close();
    document.getElementById("loading_modal").showModal();
    setIsLoading(true);

    try {
      // Simulate upload process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setIsSuccess(true);

      // Wait for success animation then move to next step
      setTimeout(() => {
        document.getElementById("loading_modal").close();
        setStep(step + 1);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="w-full mx-auto p-6 flex flex-col justify-between lg:min-h-[80vh]">
      <LoadingModal isLoading={isLoading} isSuccess={isSuccess} />
      {/* Cards Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Data Retrieval from "SAP"</h2>
          <button className="text-gray-500">ℹ️</button>
        </div>
        {cardData.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {row.row.map((card, cardIndex) => (
              <div
                key={cardIndex}
                className={`${card.bgColor} rounded-lg p-4 text-white min-h-32`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm lg:text-lg">{card.title}</span>
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <div className="text-4xl">{card.value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Results Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Results</h3>
          <span className="text-gray-500 text-sm">
            Results of "SAP" verification
          </span>
          <button className="text-gray-500">⋮</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {resultsData.map((item, index) => (
            <div key={index} className="border-r last:border-0 pr-4">
              <p className="text-gray-500 text-sm">{item.label}</p>
              <p className="text-xl font-semibold">
                {item.value}
                {item.highlight && (
                  <span className="text-red-500 text-sm ml-2">
                    {item.highlight}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded-lg"
            onClick={() => document.getElementById("upload_modal").showModal()}
          >
            Upload Statements
          </button>
        </div>
      </div>

      {/* DaisyUI Modal */}
      <dialog id="upload_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">Upload Bank Statements</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <BiCloudUpload className="mx-auto text-4xl text-gray-400 mb-2" />
              <p className="text-gray-600 mb-2">
                Drag and drop your bank statements here
              </p>
              <p className="text-gray-400 text-sm mb-4">or</p>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                accept=".pdf,.xls,.xlsx,.csv"
                onChange={handleFileChange}
                multiple
              />
              <p className="text-xs text-gray-400 mt-2">
                Supported formats: PDF, Excel, CSV
              </p>
            </div>

            {files.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">
                  Selected Files ({files.length})
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-2 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <BiTrash className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-action">
              <form method="dialog" className="space-x-2">
                <button className="btn btn-ghost">Cancel</button>
                <button
                  type="submit"
                  className="btn bg-teal-600 text-white hover:bg-teal-700"
                  disabled={files.length === 0}
                  onClick={handleSubmit}
                >
                  Upload {files.length > 0 && `(${files.length})`}
                </button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DataRetrieval;
