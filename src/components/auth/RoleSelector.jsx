"use client";

import { Building2, Layers3, User } from "lucide-react";

export default function RoleSelector({ onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <button
        onClick={() => onSelect("org")}
        className="group flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm transition hover:shadow-md hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
      >
        <Building2 className="h-6 w-6 text-indigo-600 mb-2" />
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          Organization
        </span>
      </button>

      <button
        onClick={() => onSelect("dept")}
        className="group flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm transition hover:shadow-md hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
      >
        <Layers3 className="h-6 w-6 text-indigo-600 mb-2" />
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          Department
        </span>
      </button>

      <button
        onClick={() => onSelect("staff")}
        className="group flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm transition hover:shadow-md hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
      >
        <User className="h-6 w-6 text-indigo-600 mb-2" />
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          Staff
        </span>
      </button>
    </div>
  );
}
