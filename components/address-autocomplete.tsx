import { ChangeEvent, FocusEvent, useState } from "react";

export const AddressAutocomplete = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}: {
  values: { address: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (address: string) => {
    const result = await (
      await fetch(`/api/suggest-places?address=${address}`)
    ).json();

    setSuggestions(result);
  };

  return (
    <div className="dropdown">
      <div>
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
      </div>
      {open && !!suggestions.length && (
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
    </div>
  );
};
