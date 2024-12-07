import React from 'react';
const LoadingModal = ({ isLoading, isSuccess, onClose }) => {
  return (
    <dialog id="loading_modal" className="modal">
      <div className="modal-box max-w-sm text-center p-6">
        {isLoading ? (
          <>
            <div className="flex flex-col items-center gap-3">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="text-lg font-medium">Processing...</p>
              <p className="text-sm text-gray-500">Please wait while we analyze your data</p>
            </div>
          </>
        ) : isSuccess ? (
          <>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg 
                  className="h-8 w-8 text-green-500" 
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
              </div>
              <p className="text-lg font-medium">Upload Complete!</p>
              <p className="text-sm text-gray-500">Your data has been processed successfully</p>
            </div>
          </>
        ) : null}
      </div>
    </dialog>
  );
};

export default LoadingModal;