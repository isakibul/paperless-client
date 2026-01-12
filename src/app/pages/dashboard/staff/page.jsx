"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StaffDashboard() {
  const router = useRouter();
  const [staff, setStaff] = useState(null);
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/pages/login");
      return;
    }

    const staffData = {
      id: localStorage.getItem("staffId"),
      username: localStorage.getItem("username"),
      fullName: localStorage.getItem("fullName"),
      role: localStorage.getItem("role"),
      departmentId: localStorage.getItem("departmentId"),
      departmentName: localStorage.getItem("departmentName"),
      organizationId: localStorage.getItem("organizationId"),
      organizationName: localStorage.getItem("organizationName"),
    };

    setStaff(staffData);

    /**
     * Fetch organization name
     */
    axios
      .get(
        `http://localhost:5000/api/v1/organization/${staffData.organizationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setOrgName(res.data.data.organizationName);
      })
      .catch(() => {
        setOrgName("Unknown Organization");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  console.log(staff);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Staff Dashboard
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Staff Info */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase mb-3">
              Staff Info
            </h3>
            <p>
              <strong>Full Name:</strong> {staff.fullName}
            </p>
            <p>
              <strong>Username:</strong> {staff.username}
            </p>
            <p>
              <strong>Role:</strong> {staff.role}
            </p>
          </div>

          {/* Department Info */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase mb-3">
              Department
            </h3>
            <p>
              <strong>Name:</strong> {staff.departmentName}
            </p>
            <p>
              <strong>ID:</strong> {staff.departmentId}
            </p>
          </div>

          {/* Organization Info */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase mb-3">
              Organization
            </h3>
            <p>
              <strong>Name:</strong> {staff.organizationName}
            </p>
            <p>
              <strong>ID:</strong> {staff.organizationId}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/pages/login");
          }}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
