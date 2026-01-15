"use client";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const validationSchema = Yup.object({
  departmentUsername: Yup.string()
    .min(3, "At least 3 characters")
    .max(100, "Max 100 characters")
    .required("Username is required"),

  departmentName: Yup.string()
    .min(2, "At least 2 characters")
    .max(150, "Max 150 characters")
    .required("Department name is required"),

  about: Yup.string().max(1000, "Must be at most 1000 characters"),

  password: Yup.string()
    .min(6, "At least 6 characters")
    .max(255, "Max 255 characters")
    .required("Password is required"),
});

export default function DepartmentRegister() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
        <Formik
          initialValues={{
            departmentUsername: "",
            departmentName: "",
            about: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const token = localStorage.getItem("token");

              const res = await axios.post(
                "http://localhost:5000/api/v1/auth/department-register",
                values,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              toast.success(res.data.message);
              resetForm();
            } catch (error) {
              const message =
                error.response?.data?.message || "Something went wrong";

              toast.error(message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 text-center">
                Register Department
              </h3>

              <div>
                <Field
                  name="departmentName"
                  placeholder="Department Name"
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="departmentName"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div>
                <Field
                  name="departmentUsername"
                  placeholder="Department Username"
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="departmentUsername"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="about"
                  rows={3}
                  placeholder="About department (optional)"
                  className="w-full resize-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="about"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create Department"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
