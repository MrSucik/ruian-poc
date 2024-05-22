"use client";

import styles from "./page.module.css";
import React from "react";
import { Formik } from "formik";

export default function Home() {
  return (
    <main className={styles.main}>
      <Formik
        initialValues={{ address: "" }}
        validate={(values) => {
          console.log("values", values);

          const errors: { address?: string } = {};
          if (!values.address) {
            errors.address = "Required";
          }
          return errors;
        }}
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
        }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <input
                type="address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
              {errors.address && touched.address && errors.address}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </main>
  );
}
