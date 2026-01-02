"use client";
import { useState } from "react";

export default function DepartmentRegister() {
  const [form, setForm] = useState({
    departmentUsername: "",
    departmentName: "",
    about: "",
    password: "",
    organizationId: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/v1/auth/department/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <form onSubmit={submit}>
      <h3>Department Register</h3>
      <input
        placeholder="Department Name"
        value={form.departmentName}
        onChange={(e) => setForm({ ...form, departmentName: e.target.value })}
      />
      <input
        placeholder="Department Username"
        value={form.departmentUsername}
        onChange={(e) =>
          setForm({ ...form, departmentUsername: e.target.value })
        }
      />
      <textarea
        placeholder="About"
        value={form.about}
        onChange={(e) => setForm({ ...form, about: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <input
        placeholder="Organization ID"
        value={form.organizationId}
        onChange={(e) => setForm({ ...form, organizationId: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
}
