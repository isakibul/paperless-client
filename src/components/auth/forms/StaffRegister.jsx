"use client";
import { useState } from "react";

export default function StaffRegister() {
  const [form, setForm] = useState({
    deptId: "",
    fullName: "",
    username: "",
    password: "",
    role: "Staff",
  });

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/v1/auth/staff/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <form onSubmit={submit}>
      <h3>Staff Register</h3>
      <input
        placeholder="Department ID"
        value={form.deptId}
        onChange={(e) => setForm({ ...form, deptId: e.target.value })}
      />
      <input
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="Staff">Staff</option>
        <option value="Head">Head</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
