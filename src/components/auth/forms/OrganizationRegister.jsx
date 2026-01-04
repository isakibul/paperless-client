"use client";

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  organizationUsername: Yup.string()
    .min(3, "At least 3 characters")
    .max(100, "Max 100 characters")
    .required("Username is required"),

  organizationName: Yup.string()
    .min(2, "At least 2 characters")
    .max(150, "Max 150 characters")
    .required("Name is required"),

  organizationType: Yup.string()
    .min(2, "At least 2 characters")
    .max(100, "Max 100 characters")
    .required("Type is required"),

  about: Yup.string().max(1000, "Must be at most 1000 characters"),

  password: Yup.string()
    .min(6, "At least 6 characters")
    .max(255, "Max 255 characters")
    .required("Password is required"),
});

export default function OrganizationRegister() {
  return (
    <Formik
      initialValues={{
        organizationUsername: "",
        organizationName: "",
        organizationType: "",
        about: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await axios.post(
            "http://localhost:5000/api/v1/auth/organization-register",
            values
          );
          resetForm();
        } catch (error) {
          console.error(
            "Registration failed:",
            error.response?.data || error.message
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            Register Organization
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
              name="organizationName"
              placeholder="Organization Name"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="organizationName"
              component="p"
              className="mt-1 text-xs text-red-500"
            />
          </div>

          <div>
            <Field
              name="organizationType"
              placeholder="Organization Type"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="organizationType"
              component="p"
              className="mt-1 text-xs text-red-500"
            />
          </div>

          <div>
            <Field
              as="textarea"
              name="about"
              rows={3}
              placeholder="About organization (optional)"
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
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
