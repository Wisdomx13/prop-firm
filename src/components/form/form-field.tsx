"use client";

import * as React from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useTheme } from "@/context/ThemeContext";

interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
  dataCy?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  autoComplete,
  dataCy = "textField",
}) => {
  const id = `${name}-form-item`;
  const { isDark } = useTheme();

  const [passwordShow, setPasswordShow] = React.useState(false);

  return (
    <div className="flex w-full relative flex-col gap-1">
      <label htmlFor={id} className={`font-light text-left rounded text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <div
        aria-describedby={`${id}-description`}
        aria-invalid="false"
        className="flex relative justify-end items-center"
      >
        <input
          id={id}
          data-cy={dataCy}
          autoComplete={autoComplete}
          placeholder={placeholder}
          type={type != "password" ? type : passwordShow ? "text" : "password"}
          value={value}
          name={name}
          onChange={onChange}
          className={`flex px-3 py-2 w-full h-12 text-sm leading-5 rounded-lg border border-[#B8860B] ease-in-out animate-[0.3s_ease_0s_1_normal_none_running_none] duration-[0.3s] overflow-x-clip overflow-y-clip shadow-[rgb(255,255,255)_0px_0px_0px_0px,rgba(59,130,246,0.5)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px] transition-colors ${
            isDark
              ? 'bg-neutral-900 text-white placeholder:text-gray-500'
              : 'bg-gray-50 text-gray-900 placeholder:text-gray-400'
          }`}
        />

        {type === "password" && (
          <>
            <button
              onClick={() => setPasswordShow(!passwordShow)}
              type="button"
              className={`absolute top-1/2 -translate-y-1/2 right-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {!passwordShow ? (
                <IoMdEye className="w-4 h-4" />
              ) : (
                <IoIosEyeOff className="w-4 h-4" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
