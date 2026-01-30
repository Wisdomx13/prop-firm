/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [country, setCountry] = React.useState("us");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="gap-1">
      <label htmlFor="phone" className="w-full font-light text-left rounded">
        Phone
      </label>
      <div
        aria-describedby=":rc:-form-item-description"
        aria-invalid="false"
        className="relative"
      >
        <div className="flex px-3 py-2 w-full h-12 text-sm leading-5 rounded-md border border-[#B8860B] bg-neutral-900">
          <div className="relative">
            <button
              title="United States"
              role="combobox"
              aria-label="Country selector"
              aria-haspopup="listbox"
              aria-expanded="false"
              aria-controls="country-list"
              type="button"
              data-country={country}
              className="flex justify-center items-center -mr-px w-full h-9 rounded rounded-tl rounded-bl select-none bg-black bg-opacity-0 border-black border-opacity-0"
            >
              <div className="flex justify-center items-center select-none">
                <img
                  draggable="false"
                  data-country={country}
                  alt=""
                  src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1fa-1f1f8.svg"
                  className="mx-1 w-6 max-w-full h-6 align-middle select-none overflow-x-clip overflow-y-clip"
                />
                <div className="mr-1 border-t-4 select-none border-[4px_4px_0px] border-[rgb(119,119,119)_rgba(0,0,0,0)_rgb(206,207,208)] border-x-4 duration-[0.1s] ease-[ease-out]" />
              </div>
            </button>
          </div>
          <input
            id="phone"
            type="tel"
            value={value}
            name="phone"
            onChange={handlePhoneChange}
            className="w-full h-9 text-sm rounded-tr rounded-br overflow-x-clip overflow-y-clip"
          />
        </div>
      </div>
    </div>
  );
};
