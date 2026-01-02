"use client";

export default function AuthModeSelector({ onSelect }) {
  return (
    <div>
      <button onClick={() => onSelect("login")}>Login</button>
      <button onClick={() => onSelect("register")}>Register</button>
    </div>
  );
}
