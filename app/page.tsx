"use client";

import React, { useState } from "react";
import { Formik } from "formik";

const mapboxApiToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;
const googleApiToken = process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN;

const validate = (values: { address: string }) => {
  const errors: { address?: string } = {};
  if (!values.address) {
    errors.address = "Address is required.";
  }
  return errors;
};

const fetchMapboxSuggestions = async (address: string) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxApiToken}`
  );
  const data = await response.json();
  return data.features.map((feature: any) => feature.place_name);
};

const fetchGoogleSuggestions = async (address: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${googleApiToken}&types=geocode`
  );
  const data = await response.json();
  return data.predictions.map((prediction: any) => prediction.description);
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (address: string) => {
    const mapboxSuggestions = await fetchMapboxSuggestions(address);
    const googleSuggestions = await fetchGoogleSuggestions(address);

    console.log("Mapbox Suggestions", googleSuggestions);

    setSuggestions(mapboxSuggestions);
  };

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
                  onChange={(e) => {
                    handleChange(e);
                    fetchSuggestions(e.target.value);
                  }}
                  onBlur={handleBlur}
                  onFocus={() => setOpen(true)}
                  value={values.address}
                />
              </summary>
              {!!suggestions.length && (
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        className="btn btn-ghost justify-start"
                        onClick={() => {
                          setFieldValue("address", suggestion);
                          setOpen(false);
                        }}
                        type="button"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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
            {values.address && (
              <iframe
                title="Google Maps"
                src={`https://www.google.com/maps/embed/v1/place?key=${googleApiToken}&q=${values.address}`}
                className="w-full h-48"
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
