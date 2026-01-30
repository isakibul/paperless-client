"use client";

import { useState } from "react";

const initialStaff = [
  { id: 1, name: "Dr. Md. Rahman", role: "Head" },
  { id: 2, name: "Sabbir Hossain", role: "Staff" },
  { id: 3, name: "Nur E Jannat Eva", role: "Staff" },
  { id: 4, name: "Khadija Islam Joty", role: "Staff" },
];

export default function ManageStaffPage() {
  const [staffList, setStaffList] = useState(initialStaff);

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this staff?");
    if (!confirmed) return;
    setStaffList((prev) => prev.filter((staff) => staff.id !== id));
  };

  const handleToggleRole = (id) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff.id === id
          ? {
              ...staff,
              role: staff.role === "Head" ? "Staff" : "Head",
            }
          : staff,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Manage Staff
        </h1>

        {staffList.length === 0 ? (
          <p className="text-zinc-500">No staff members found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {staffList.map((staff) => (
              <div
                key={staff.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm"
              >
                {/* Staff Info */}
                <div>
                  <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                    {staff.name}
                  </p>

                  <span
                    className={`inline-block mt-1 rounded-full px-3 py-1 text-xs font-medium
                      ${
                        staff.role === "Head"
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                          : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      }
                    `}
                  >
                    {staff.role}
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleToggleRole(staff.id)}
                    className="flex-1 rounded-lg border border-indigo-500 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-900/40"
                  >
                    Change Role
                  </button>

                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="flex-1 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-900/40"
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
  );
}
