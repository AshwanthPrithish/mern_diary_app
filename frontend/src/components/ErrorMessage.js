import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "dark", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
