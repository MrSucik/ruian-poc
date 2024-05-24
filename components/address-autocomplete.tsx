import { useSuggestions } from "#/hooks/use-suggestions";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { suggestions, fetchSuggestions } = useSuggestions();

  return (
    <div className="dropdown">
      <div>
        <input
          type="address"
          name="address"
          className="form-control"
          onChange={(e) => {
            handleChange(e);
            fetchSuggestions(e.target.value);
          }}
          onBlur={handleBlur}
          onFocus={() => setDropdownOpen(true)}
          value={values.address}
        />
      </div>
      {dropdownOpen && !!suggestions.length && (
        <ul className="dropdown-menu show" style={{ position: "absolute" }}>
          {suggestions.map((suggestion) => (
            <li key={suggestion}>
              <button
                className="dropdown-item"
                onClick={() => {
                  setFieldValue("address", suggestion);
                  setDropdownOpen(false);
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
