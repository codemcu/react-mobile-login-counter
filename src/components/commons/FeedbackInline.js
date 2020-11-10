import React from "react";
import PropTypes from "prop-types";

const FeedbackInline = ({ error, validation }) => {
  return (
    <div>
      <p role='alert'>{error}</p>
      <p role='alert'>{validation}</p>
    </div>
  );
};

FeedbackInline.propTypes = {
  error: PropTypes.string,
  validation: PropTypes.string,
};

export default FeedbackInline;
