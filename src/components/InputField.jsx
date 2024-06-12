import React from "react";
import { FaBan } from "react-icons/fa";
const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  className,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div>{label && <label htmlFor={name} className="text-sm">{label}</label>}</div>
      <div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`py-1 px-2 outline-0 w-[100%] rounded ${className} ${
            touched && error ? " bg-red-50 border border-red-500 rounded" : ""
          }`}
          placeholder={label}
        />
      </div>
      <div>
        {touched && error ? (
          <div className="flex gap-2 items-center text-red-500">
            <FaBan className="text-sm" />{" "}
            <small className=" text-xs">{error}</small>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
