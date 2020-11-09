import React from "react";
import PropTypes from "prop-types";

const FeedbackInline = ({ error }) => {
  return <p role='alert'>{error}</p>;
};

FeedbackInline.propTypes = {
  error: PropTypes.string,
};

export default FeedbackInline;
