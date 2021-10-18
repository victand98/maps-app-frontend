import React from "react";
import classNames from "classnames";

export const Spinner = ({ size = "md" }) => {
  const spinnerClass = classNames(
    "animate-spin",
    "rounded-full",
    "border-t-2",
    "border-b-2",
    "border-purple-500",
    {
      "h-20 w-20": size === "xl",
      "h-16 w-16": size === "lg",
      "h-10 w-10": size === "md",
      "h-4 w-4": size === "sm",
    }
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
        <Spinner size="lg" />
        <p className="font-light text-xs mt-3 text-gray-600">{title}</p>
      </div>
    </div>
  );
};
