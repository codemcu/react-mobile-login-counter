import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  htmlFor,
  name,
  id,
  type,
  placeholder,
  value,
  onChange,
  children,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={htmlFor}></label>
      <input
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};

export default TextInput;
