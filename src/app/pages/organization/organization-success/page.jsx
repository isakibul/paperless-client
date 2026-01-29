"use client";

import { useRouter } from "next/navigation";

export default function OrganizationSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg text-center">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Organization Created Successfully!
        </h1>

        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Your organization has been registered successfully. You can now login
          or go back to the homepage.
        </p>

        <button
          onClick={() => router.push("/pages/auth")}
          className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
