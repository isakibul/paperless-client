"use client";

import { useState } from "react";

/* 🔹 Dummy Files Data */
const DUMMY_FILES = [
  // Notice files from offices
  {
    id: 1,
    title: "University Holiday Notice",
    pdfUrl: "/doc.pdf",
    createdBy: "VC Office",
    createdAt: "2025-01-10",
    type: "notice",
  },
  {
    id: 2,
    title: "Semester Result Announcement",
    pdfUrl: "/doc.pdf",
    createdBy: "Registrar Office",
    createdAt: "2025-01-12",
    type: "notice",
  },

  // Archived files created by departments/staff
  {
    id: 3,
    title: "Exam Regulation Policy 2024",
    pdfUrl: "/doc.pdf",
    createdBy: "Department of Law",
    createdAt: "2024-11-22",
    routedTo: ["VC Office", "Controller Office"],
    type: "archive",
  },
  {
    id: 4,
    title: "Faculty Recruitment Notice",
    pdfUrl: "/doc.pdf",
    createdBy: "Department of Human Resources",
    createdAt: "2024-10-05",
    routedTo: ["Registrar Office"],
    type: "archive",
  },
];

export default function DepartmentArchivePage() {
  const [activeTab, setActiveTab] = useState("notice");
  const [files, setFiles] = useState(DUMMY_FILES);

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this file?");
    if (!confirmed) return;

    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const filteredFiles = files.filter((file) => file.type === activeTab);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Department Files
        </h1>

        {/* 🔹 Tabs */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setActiveTab("notice")}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
              activeTab === "notice"
                ? "bg-indigo-600 text-white"
                : "border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Notice Files
          </button>

          <button
            onClick={() => setActiveTab("archive")}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
              activeTab === "archive"
                ? "bg-indigo-600 text-white"
                : "border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Archived Files
          </button>
        </div>

        {/* 🔹 Files Grid */}
        {filteredFiles.length === 0 ? (
          <p className="text-zinc-500">No files found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredFiles.map((file) => (
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
                      Created by: {file.createdBy}
                    </p>
                    <p className="text-xs text-zinc-400">
                      Date: {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      file.type === "notice"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    }`}
                  >
                    {file.type === "notice" ? "Notice" : "Archived"}
                  </span>
                </div>

                {/* Routed Offices (only for archived files) */}
                {file.type === "archive" && file.routedTo && (
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
                )}

                {/* PDF Viewer */}
                <div className="mt-5 overflow-hidden rounded-xl border">
                  <iframe
                    src={`${file.pdfUrl}#toolbar=0`}
                    title={file.title}
                    className="h-[400px] w-full"
                  />
                </div>

                {/* Delete Button only for archive */}
                {file.type === "archive" && (
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
