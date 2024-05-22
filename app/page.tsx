"use client";

import React, { useState } from "react";
import { Formik } from "formik";

const validate = (values: { address: string }) => {
  const errors: { address?: string } = {};
  if (!values.address) {
    errors.address = "Address is required.";
  }
  return errors;
};

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="container grid place-items-center h-screen mx-auto">
      <Formik
        initialValues={{ address: "" }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="grid gap-2 w-full">
            <details className="dropdown" open={open}>
              <summary>
                <input
                  type="address"
                  name="address"
                  className="input input-primary w-full"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={() => setOpen(true)}
                  value={values.address}
                />
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setFieldValue("address", "xx");
                      setOpen(false);
                    }}
                    type="button"
                  >
                    Address 1
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setFieldValue("address", "xx");
                      setOpen(false);
                    }}
                    type="button"
                  >
                    Address 2
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setFieldValue("address", "xx");
                      setOpen(false);
                    }}
                    type="button"
                  >
                    Address 3
                  </button>
                </li>
              </ul>
            </details>
            {errors.address && touched.address && (
              <div role="alert" className="alert alert-error p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errors.address}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </main>
  );
}
