import React from "react";
import "./errormessage.scss";

const ErrorMessage = ({ error }) => {
  return <div className="error-message">{error}</div>;
};

export default ErrorMessage;
