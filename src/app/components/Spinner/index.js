import React from "react";
import classNames from "classnames";

export const Spinner = ({ size = 32 }) => {
  const spinnerClass = classNames(
    "animate-spin",
    "rounded-full",
    `h-${size}`,
    `w-${size}`,
    "border-t-2",
    "border-b-2",
    "border-purple-500"
  );
  return (
    <div className="flex justify-center items-center">
      <div className={spinnerClass} />
    </div>
  );
};

export const LoaderViewport = ({ title }) => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Spinner size={16} />
        <p className="font-light text-xs mt-3 text-gray-600">{title}</p>
      </div>
    </div>
  );
};
