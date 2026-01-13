"use client";

export default function StaffDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Staff Dashboard
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase mb-3">
              Staff Info
            </h3>
            <p>
              <strong>Full Name:</strong>
            </p>
            <p>
              <strong>Username:</strong>
            </p>
            <p>
              <strong>Role:</strong>
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase mb-3">
              Department
            </h3>
            <p>
              <strong>Name:</strong>
            </p>
            <p>
              <strong>ID:</strong>
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase mb-3">
              Organization
            </h3>
            <p>
              <strong>Name:</strong>
            </p>
            <p>
              <strong>ID:</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => {}}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
