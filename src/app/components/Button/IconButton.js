import React from "react";
import { Button } from ".";

export const IconButton = ({ icon: Icon, children, ...rest }) => {
  return (
    <Button {...rest}>
      <Icon className="w-4 h-4 mr-2" />
      <span>{children}</span>
    </Button>
  );
};
