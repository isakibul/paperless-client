"use client";

import { useEffect, useState } from "react";

export default function DepartmentListPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/department/departments",
      );
      const data = await res.json();
      setDepartments(data.data || []);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    } finally {
      setLoading(false);
    }
  };

  const openConfirm = (dept) => {
    setSelectedDept(dept);
    setShowConfirm(true);
  };

  const closeConfirm = () => {
    setShowConfirm(false);
    setSelectedDept(null);
  };

  const handleDelete = async () => {
    if (!selectedDept) return;

    try {
      await fetch(
        `http://localhost:5000/api/v1/department/departments/${selectedDept.id}`,
        {
          method: "DELETE",
        },
      );

      setDepartments((prev) =>
        prev.filter((dept) => dept.id !== selectedDept.id),
      );

      closeConfirm();
    } catch (error) {
      console.error("Failed to delete department", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Department List
          </h1>

          {loading ? (
            <p className="text-zinc-500">Loading departments...</p>
          ) : departments.length === 0 ? (
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

                    {dept.about && (
                      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                        {dept.about}
                      </p>
                    )}
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
