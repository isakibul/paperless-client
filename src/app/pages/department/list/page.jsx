"use client";

import { useState } from "react";

const DUMMY_DEPARTMENTS = [
  {
    id: 1,
    departmentName: "Department of Computer Science & Engineering",
    departmentUsername: "cse",
    about:
      "Focuses on computer programming, software engineering, artificial intelligence, and research in computing technologies.",
    createdAt: "2024-02-12",
  },
  {
    id: 2,
    departmentName: "Department of Electrical & Electronic Engineering",
    departmentUsername: "eee",
    about:
      "Dedicated to power systems, electronics, communication engineering, and practical industrial applications.",
    createdAt: "2024-02-15",
  },
  {
    id: 3,
    departmentName: "Department of Civil Engineering",
    departmentUsername: "ce",
    about:
      "Covers structural engineering, transportation, environmental engineering, and infrastructure development.",
    createdAt: "2024-02-18",
  },
  {
    id: 4,
    departmentName: "Department of Business Administration",
    departmentUsername: "bba",
    about:
      "Provides education in management, accounting, marketing, finance, and entrepreneurship.",
    createdAt: "2024-02-20",
  },
  {
    id: 5,
    departmentName: "Department of Law",
    departmentUsername: "law",
    about:
      "Offers legal education focusing on constitutional law, criminal law, and justice system studies.",
    createdAt: "2024-02-22",
  },
  {
    id: 6,
    departmentName: "Department of English",
    departmentUsername: "english",
    about:
      "Emphasizes literature, linguistics, communication skills, and critical thinking.",
    createdAt: "2024-02-25",
  },
];

export default function DepartmentListPage() {
  const [departments, setDepartments] = useState(DUMMY_DEPARTMENTS);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  const openConfirm = (dept) => {
    setSelectedDept(dept);
    setShowConfirm(true);
  };

  const closeConfirm = () => {
    setShowConfirm(false);
    setSelectedDept(null);
  };

  const handleDelete = () => {
    if (!selectedDept) return;

    setDepartments((prev) =>
      prev.filter((dept) => dept.id !== selectedDept.id),
    );

    closeConfirm();
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Department List
          </h1>

          {departments.length === 0 ? (
            <p className="text-zinc-500">No departments found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition hover:shadow-md"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                      {dept.departmentName}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      @{dept.departmentUsername}
                    </p>

                    {/* {dept.about && (
                      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                        {dept.about}
                      </p>
                    )} */}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">
                      Created: {new Date(dept.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={() => openConfirm(dept)}
                      className="rounded-lg border border-red-500 px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔥 Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              Delete Department
            </h3>

            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Are you sure you want to delete{" "}
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {selectedDept?.departmentName}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeConfirm}
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
