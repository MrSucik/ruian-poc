"use client";

import React from "react";
import { Formik } from "formik";
import { AddressAutocomplete } from "#/components/address-autocomplete";

const validate = (values: { address: string }) => {
  const errors: { address?: string } = {};
  if (!values.address) {
    errors.address = "Address is required.";
  }
  return errors;
};

export default function Home() {
  return (
    <main className="d-flex justify-content-center align-items-center vh-100 mx-auto">
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
          <form
            onSubmit={handleSubmit}
            className="d-grid gap-2 w-100"
            style={{ maxWidth: "400px" }}
          >
            <AddressAutocomplete
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />
            {errors.address && touched.address && (
              <div
                role="alert"
                className="alert alert-danger p-2 d-flex align-items-center gap-2"
                style={{ maxHeight: "64px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    flexShrink: 0,
                    stroke: "currentColor",
                  }}
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
            {values.address && (
              <iframe
                title="Google Maps"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}&q=${values.address}`}
                className="w-100 h-64"
              ></iframe>
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
