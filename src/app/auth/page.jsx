"use client";

import AuthModeSelector from "@/components/auth/AuthModeSelector";
import RoleSelector from "@/components/auth/RoleSelector";
import { useState } from "react";

import DeptLogin from "@/components/auth/forms/DepartmentLogin";
import DeptRegister from "@/components/auth/forms/DepartmentRegister";
import OrgLogin from "@/components/auth/forms/OrganizationLogin";
import OrgRegister from "@/components/auth/forms/OrganizationRegister";
import StaffLogin from "@/components/auth/forms/StaffLogin";
import StaffRegister from "@/components/auth/forms/StaffRegister";

export default function AuthPage() {
  const [role, setRole] = useState(null);
  const [mode, setMode] = useState(null);

  const renderForm = () => {
    if (!role || !mode) return null;

    const map = {
      org: { login: <OrgLogin />, register: <OrgRegister /> },
      dept: { login: <DeptLogin />, register: <DeptRegister /> },
      staff: { login: <StaffLogin />, register: <StaffRegister /> },
    };

    return map[role][mode];
  };

  return (
    <div className="flex min-h-screen items-center justify-center from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:via-black dark:to-zinc-800 px-6">
      <div className="w-full max-w-lg rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur shadow-xl p-8 space-y-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Paperless
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Secure access for organizations, departments, and staff
        </p>

        {!role && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
              Who you are?
            </h2>
            <RoleSelector onSelect={setRole} />
          </div>
        )}

        {role && !mode && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
              Continue as{" "}
              {role === "org"
                ? "Organization"
                : role === "dept"
                ? "Department"
                : "Staff"}
            </h2>
            <AuthModeSelector onSelect={setMode} />
            <button
              onClick={() => setRole(null)}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition"
            >
              ← Change role
            </button>
          </div>
        )}

        {role && mode && (
          <div className="space-y-4 text-left">
            <button
              onClick={() => setMode(null)}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition"
            >
              ← Back
            </button>

            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 shadow-sm">
              {renderForm()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
