import React from "react";
import classNames from "classnames";

export const Button = ({ children, className, ...rest }) => {
  const buttonClass = classNames(
    "inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-100 border border-transparent rounded-md hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500",
    className
  );

  return (
    <button type="button" className={buttonClass} {...rest}>
      {children}
    </button>
  );
};
