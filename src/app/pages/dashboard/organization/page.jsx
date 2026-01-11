"use client";

import { useRouter } from "next/navigation";

export default function OrganizationDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Organization Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/pages/register/department")}
            className="flex flex-col items-start justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition hover:shadow-md hover:border-indigo-500"
          >
            <div>
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                Add Department
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Create and manage departments under your organization.
              </p>
            </div>

            <span className="mt-4 text-sm font-medium text-indigo-600">
              Go →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
