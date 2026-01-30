"use client";

import { useState } from "react";

const DUMMY_RUNNING_FILES = [
  {
    id: 1,
    title: "Academic Calendar 2025",
    pdfUrl: "/doc.pdf",
    creatorDepartment: "Department of CSE",
    createdAt: "2025-01-12",
    routedTo: ["VC Office", "Registrar Office"],
    signed: false,
  },
  {
    id: 2,
    title: "Semester Fee Structure",
    pdfUrl: "/doc.pdf",
    creatorDepartment: "Department of Business Administration",
    createdAt: "2025-01-15",
    routedTo: ["Registrar Office", "Controller Office"],
    signed: false,
  },
  {
    id: 3,
    title: "Exam Regulation Policy",
    pdfUrl: "/doc.pdf",
    creatorDepartment: "Department of Law",
    createdAt: "2025-01-18",
    routedTo: ["VC Office", "Controller Office"],
    signed: true,
  },
];

export default function RunningFilesPage() {
  const [files, setFiles] = useState(DUMMY_RUNNING_FILES);

  const handleSign = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const pendingFiles = files.filter((file) => !file.signed);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Pending Files
        </h1>

        {pendingFiles.length === 0 ? (
          <p className="text-zinc-500">No pending files found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pendingFiles.map((file) => (
              <div
                key={file.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                      {file.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                      Created by: {file.creatorDepartment}
                    </p>
                    <p className="text-xs text-zinc-400">
                      Date: {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="rounded-full px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                    Pending
                  </span>
                </div>

                {/* Routed Offices */}
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Routed To:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {file.routedTo.map((office) => (
                      <span
                        key={office}
                        className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                      >
                        {office}
                      </span>
                    ))}
                  </div>
                </div>

                {/* PDF Viewer */}
                <div className="mt-5 overflow-hidden rounded-xl border">
                  <iframe
                    src={`${file.pdfUrl}#toolbar=0`}
                    title={file.title}
                    className="h-[400px] w-full"
                  />
                </div>

                {/* Approve / Sign Button */}
                <button
                  onClick={() => handleSign(file.id)}
                  className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Approve / Sign
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
