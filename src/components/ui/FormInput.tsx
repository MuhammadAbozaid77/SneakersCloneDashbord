import React from "react";

type PropsType = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export default function FormInput({ label, error, children }: PropsType) {
  return (
    <div className="flex justify-center items-start flex-col mb-3">
      <label className="font-semibold text-gray-600" htmlFor={label}>
        {label}
      </label>
      {children}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
