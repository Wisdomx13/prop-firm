/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";

interface CountryStateSelectorProps {
  countryValue: string;
  stateValue: string;
  onCountryChange: (value: string) => void;
  onStateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CountryStateSelector: React.FC<CountryStateSelectorProps> = ({
  countryValue,
  stateValue,
  onCountryChange,
  onStateChange,
}) => {
  return (
    <section lang="en" translate="no" className="grid gap-4 items-center">
      <div className="flex flex-col gap-2">
        <label htmlFor="country-form-item" className="font-light rounded">
          Country
        </label>
        <button
          id="country-form-item"
          role="combobox"
          aria-expanded="false"
          type="button"
          aria-haspopup="dialog"
          aria-controls="radix-:rf:"
          data-state="closed"
          className="z-0 px-4 py-2 w-full h-10 text-sm leading-5 rounded border border-[#B8860B] transition-colors ease-in-out select-none bg-neutral-900 duration-[0.15s]"
          onClick={() => {
            // Handle country selection
          }}
        >
          {countryValue || "Country"}
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="state-form-item" className="font-light rounded">
          State
        </label>
        <div
          aria-describedby="state-form-item-description"
          aria-invalid="false"
        >
          <input
            id="state-form-item"
            placeholder="State"
            value={stateValue}
            name="state"
            onChange={onStateChange}
            className="flex px-3 py-2 w-full h-10 text-sm leading-5 rounded-md border border-[#B8860B] bg-neutral-900 overflow-x-clip overflow-y-clip"
          />
        </div>
      </div>
    </section>
  );
};
