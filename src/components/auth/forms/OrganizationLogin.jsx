"use client";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object({
  organizationUsername: Yup.string()
    .min(3, "At least 3 characters")
    .max(100, "Max 100 characters")
    .required("Username is required"),

  password: Yup.string()
    .min(6, "At least 6 characters")
    .max(255, "Max 255 characters")
    .required("Password is required"),
});

export default function OrganizationLogin() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        organizationUsername: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/v1/auth/organization-login",
            values
          );

          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem(
            "organizationUsername",
            res.data.data.organizationUsername
          );

          setStatus({ success: "Login successful" });

          router.push("/pages/dashboard/organization");
        } catch (error) {
          setStatus({
            error:
              error.response?.data?.message ||
              "Login failed. Please try again.",
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            Organization Login
          </h3>

          <div>
            <Field
              name="organizationUsername"
              placeholder="Organization Username"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="organizationUsername"
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

          {status?.error && (
            <p className="text-xs text-red-500 text-center">{status.error}</p>
          )}

          {status?.success && (
            <p className="text-xs text-green-500 text-center">
              {status.success}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
