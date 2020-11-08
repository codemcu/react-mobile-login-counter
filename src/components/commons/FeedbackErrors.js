import React from "react";
import PropTypes from "prop-types";

const FeedbackErrors = ({ errorsForm }) => {
  return (
    <div role='alert'>
      <p>Please fix the following errors</p>
      <ul>
        {Object.keys(errorsForm).map((error) => (
          <li key={error}>{errorsForm[error]}</li>
        ))}
      </ul>
    </div>
  );
};

FeedbackErrors.propTypes = {};

export default FeedbackErrors;
