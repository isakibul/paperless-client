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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:via-black dark:to-zinc-800 px-6 font-sans">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Paperless
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Secure document & workflow system
          </p>
        </div>

        {/* Role selection */}
        {!role && <RoleSelector onSelect={setRole} />}

        {/* Login / Register selection */}
        {role && !mode && <AuthModeSelector onSelect={setMode} />}

        {/* Form */}
        {role && mode && (
          <div className="space-y-4">
            <button
              onClick={() => setMode(null)}
              className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition"
            >
              ← Back
            </button>

            <div className="rounded-xl bg-zinc-50 p-6 dark:bg-zinc-800">
              {renderForm()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
