"use client";

import { useState } from "react";

/* 🔹 Dummy File Data */
const INITIAL_FILES = [
  {
    id: 1,
    title: "Academic Calendar 2025",
    pdfUrl: "/doc.pdf",
    creatorDepartment: "Department of Computer Science & Engineering",
    createdAt: "2025-01-12",
    status: "running",
    routedTo: ["VC Office", "Registrar Office"],
  },
  {
    id: 2,
    title: "Semester Fee Structure",
    pdfUrl: "/doc.pdf",
    creatorDepartment: "Department of Business Administration",
    createdAt: "2025-01-15",
    status: "running",
    routedTo: ["Registrar Office", "Controller Office"],
  },
  {
    id: 3,
    title: "Exam Regulation Policy",
    pdfUrl: "/doc.pdf",
    creatorDepartment: "Department of Law",
    createdAt: "2024-11-22",
    status: "archived",
    routedTo: ["VC Office", "Controller Office"],
  },
  {
    id: 4,
    title: "Faculty Recruitment Notice",
    pdfUrl: "/doc.pdf",
    creatorDepartment: "Department of Human Resources",
    createdAt: "2024-10-05",
    status: "archived",
    routedTo: ["VC Office", "Registrar Office", "Controller Office"],
  },
];

export default function AllFilesPage() {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [activeTab, setActiveTab] = useState("running");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const visibleFiles = files.filter((file) => file.status === activeTab);

  const handleDelete = () => {
    setFiles((prev) => prev.filter((file) => file.id !== confirmDelete.id));
    setConfirmDelete(null);
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            File Management
          </h1>

          {/* Tabs */}
          <div className="mb-6 flex gap-3">
            {["running", "archived"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {tab === "running" ? "Running Files" : "File Archive"}
              </button>
            ))}
          </div>

          {/* File List */}
          {visibleFiles.length === 0 ? (
            <p className="text-zinc-500">No files found.</p>
          ) : (
            <div className="space-y-6">
              {visibleFiles.map((file) => (
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

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          file.status === "running"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                            : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        }`}
                      >
                        {file.status === "running" ? "In Progress" : "Archived"}
                      </span>

                      {/* Delete only for archived */}
                      {activeTab === "archived" && (
                        <button
                          onClick={() => setConfirmDelete(file)}
                          className="rounded-lg border border-red-500 px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          Delete
                        </button>
                      )}
                    </div>
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

                  {/* PDF */}
                  <div className="mt-5 overflow-hidden rounded-xl border">
                    <iframe
                      src={`${file.pdfUrl}#toolbar=0`}
                      title={file.title}
                      className="h-[400px] w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              Delete File
            </h3>

            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Are you sure you want to permanently delete{" "}
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {confirmDelete.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="rounded-lg border border-zinc-300 px-4 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
