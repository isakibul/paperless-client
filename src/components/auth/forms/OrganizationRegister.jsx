"use client";
import { useState } from "react";

export default function OrganizationRegister() {
  const [form, setForm] = useState({
    organizationName: "",
    organizationUsername: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/v1/auth/organization/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <form onSubmit={submit}>
      <h3>Organization Register</h3>
      <input
        placeholder="Organization Name"
        value={form.organizationName}
        onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
      />
      <input
        placeholder="Username"
        value={form.organizationUsername}
        onChange={(e) =>
          setForm({ ...form, organizationUsername: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
}
