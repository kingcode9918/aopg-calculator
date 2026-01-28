"use client";
import { useState } from "react";

interface UpdateModalProps {
  updates: {
    version: string;
    date: string;
    changes: string[];
  }[];
}

const UpdateModal = ({ updates }: UpdateModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-sm btn-ghost text-gray-400 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        Updates
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-base-200 rounded-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Update Overview</h2>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {updates.map((update, index) => (
                <div key={index} className="border-b border-base-300 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-primary">{update.version}</span>
                    <span className="text-xs text-gray-500">{update.date}</span>
                  </div>
                  <ul className="text-sm space-y-1">
                    {update.changes.map((change, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-success">•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModal;
