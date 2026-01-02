import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:via-black dark:to-zinc-800 px-6">
      <div className="max-w-xl text-center space-y-6">
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Paperless
        </h1>

        
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          A modern document & workflow management system for organizations,
          departments, and teams — simple, secure, and paper-free.
        </p>

        <div className="flex justify-center">
          <Link href="/auth">
            <button className="group relative inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800">
              Get Started
              <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </Link>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          Sign in as an Organization, Department, or Staff member.
        </p>
      </div>
    </div>
  );
}
