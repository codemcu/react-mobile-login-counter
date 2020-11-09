import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  children,
  htmlFor,
  id,
  name,
  onBlur,
  onChange,
  placeholder,
  type,
  value,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={htmlFor}></label>
      <input
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        {...props}
      >
        {children}
      </input>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};

export default TextInput;
