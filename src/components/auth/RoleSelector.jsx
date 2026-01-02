"use client";

export default function RoleSelector({ onSelect }) {
  return (
    <div>
      <button onClick={() => onSelect("org")}>Organization</button>
      <button onClick={() => onSelect("dept")}>Department</button>
      <button onClick={() => onSelect("staff")}>Staff</button>
    </div>
  );
}
