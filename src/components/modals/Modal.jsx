import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-50 rounded-lg shadow-xl w-[500px] p-6 border border-gray-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl transition-colors"
          >
            ✖
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4 space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;