"use client";
import { useState } from "react";

export default function DepartmentLogin() {
  const [form, setForm] = useState({ departmentUsername: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/v1/auth/department/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <form onSubmit={submit}>
      <h3>Department Login</h3>
      <input
        placeholder="Department Username"
        value={form.departmentUsername}
        onChange={(e) =>
          setForm({ ...form, departmentUsername: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}
