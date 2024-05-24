import { useState } from "react";

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (address: string) => {
    const result = await (
      await fetch(`/api/suggest-places?address=${address}`)
    ).json();

    setSuggestions(result);
  };

  return { suggestions, fetchSuggestions };
};
