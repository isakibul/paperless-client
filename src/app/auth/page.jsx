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
    <div className="auth-container">
      <h1>Paperless System</h1>

      {!role && <RoleSelector onSelect={setRole} />}

      {role && !mode && <AuthModeSelector onSelect={setMode} />}

      {role && mode && (
        <>
          <button onClick={() => setMode(null)}>← Back</button>
          {renderForm()}
        </>
      )}
    </div>
  );
}
