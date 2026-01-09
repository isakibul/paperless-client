"use client";

import { LogIn, UserPlus } from "lucide-react";

export default function AuthModeSelector({ role, onSelect }) {
  const canRegister = role === "org";

  return (
    <div
      className={`grid gap-4 ${canRegister ? "grid-cols-2" : "grid-cols-1"}`}
    >
      <button
        onClick={() => onSelect("login")}
        className="group flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm transition hover:shadow-md hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
      >
        <LogIn className="h-6 w-6 text-indigo-600 mb-2" />
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          Login
        </span>
      </button>

      {canRegister && (
        <button
          onClick={() => onSelect("register")}
          className="group flex flex-col items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm transition hover:shadow-md hover:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
        >
          <UserPlus className="h-6 w-6 text-indigo-600 mb-2" />
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Register
          </span>
        </button>
      )}
    </div>
  );
}
