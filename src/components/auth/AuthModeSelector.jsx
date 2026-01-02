"use client";

export default function AuthModeSelector({ onSelect }) {
  return (
    <div className="selector">
      <h2>Select action</h2>
      <button onClick={() => onSelect("login")}>Login</button>
      <button onClick={() => onSelect("register")}>Register</button>
    </div>
  );
}
