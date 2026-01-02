"use client";
import { useState } from "react";

export default function OrganizationLogin() {
  const [form, setForm] = useState({ organizationUsername: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/v1/auth/organization/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <form onSubmit={submit}>
      <h3>Organization Login</h3>
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
      <button type="submit">Login</button>
    </form>
  );
}
