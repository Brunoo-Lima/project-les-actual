import React from "react";

import Select from "react-select";

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: "Ação", label: "Ação", color: "#00B8D9" },
  { value: "Aventura", label: "Aventura", color: "#0052CC" },
  { value: "Comédia", label: "Comédia", color: "#5243AA" },
  { value: "Fantasia", label: "Fantasia", color: "#FF5630" },
  { value: "Romance", label: "Romance", color: "#FF8B00" },
  { value: "Suspense", label: "Suspense", color: "#FFC400" },
  { value: "Mistério", label: "Mistério", color: "#36B37E" },
  { value: "Shounen", label: "Shounen", color: "#00875A" },
  { value: "Seinen", label: "Seinen", color: "#253858" },
  { value: "Isekai", label: "Isekai", color: "#666666" },
];

export const MultiSelect = () => {
  return (
    <Select
      defaultValue={[colourOptions[2], colourOptions[3]]}
      isMulti
      name="colors"
      options={colourOptions}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};
