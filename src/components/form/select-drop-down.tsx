"use client";
import * as React from "react";

interface SelectDropdownProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <button
        type="button"
        role="combobox"
        aria-controls={`radix-:r${name}`}
        aria-expanded="false"
        aria-autocomplete="none"
        dir="ltr"
        data-state="closed"
        className="flex justify-between items-center px-3 py-2 w-full h-12 text-sm leading-5 rounded-lg border border-[#B8860B] ease-in-out animate-[0.3s_ease_0s_1_normal_none_running_none] bg-neutral-900 duration-[0.3s] min-h-12 shadow-[rgb(255,255,255)_0px_0px_0px_0px,rgba(59,130,246,0.5)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px]"
      >
        <span className="pointer-events-none">{value || placeholder}</span>
        <div
          aria-hidden="true"
          className="overflow-x-hidden overflow-y-hidden align-middle opacity-50 fill-none h-[15px] w-[15px]"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-50"
            aria-hidden="true"
          >
            <path
              d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
      <select
        aria-hidden="true"
        tabIndex={-1}
        name={name}
        autoComplete="false"
        className="absolute items-center -m-px w-px h-px whitespace-nowrap bg-zinc-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
