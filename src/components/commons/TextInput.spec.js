import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TextInput from "./TextInput";

test("should handleChange", () => {
  const handleChange = jest.fn();
  const handleBlur = jest.fn();

  const props = {
    htmlFor: "email",
    id: "email",
    name: "email",
    onBlur: handleBlur,
    onChange: handleChange,
    placeholder: "Email",
    type: "text",
    value: "email",
  };

  const { getByRole } = render(<TextInput {...props} />);

  const input = getByRole("textbox");
  userEvent.type(input, "text");
  expect(handleChange).toHaveBeenCalled();
});

test("should handleBlur", () => {
  const handleChange = jest.fn();
  const handleBlur = jest.fn();

  const props = {
    htmlFor: "email",
    id: "email",
    name: "email",
    onBlur: handleBlur,
    onChange: handleChange,
    placeholder: "Email",
    type: "text",
    value: "email",
  };

  const { getByRole } = render(<TextInput {...props} />);

  const input = getByRole("textbox");
  fireEvent.blur(input);
  expect(handleBlur).toHaveBeenCalled();
});

test("should render component with attr name, id, value, placeholder equal to 'email'", () => {
  const handleChange = jest.fn();
  const handleBlur = jest.fn();

  const props = {
    htmlFor: "email",
    id: "email",
    name: "email",
    onBlur: handleBlur,
    onChange: handleChange,
    placeholder: "Email",
    type: "text",
    value: "email",
  };

  const { getByDisplayValue } = render(<TextInput {...props} />);

  expect(getByDisplayValue("email").id).toBe("email");
  expect(getByDisplayValue("email").name).toBe("email");
  expect(getByDisplayValue("email").placeholder).toBe("Email");
  expect(getByDisplayValue("email").value).toBe("email");
});

// test("should render component with attr name, id, value, placeholder equal to 'email'", () => {
//   const handleChange = (event) => {
//     expect(event.target.value).toEqual("email");
//   };

//   const props = {
//     htmlFor: "email",
//     id: "email",
//     name: "email",
//     // onBlur: {handleBlur},
//     onChange: handleChange,
//     placeholder: "Email",
//     type: "text",
//     value: "email",
//   };

//   const { getByDisplayValue } = render(<TextInput {...props} />);

//   const node = getByDisplayValue("email");
//   fireEvent.change(node, { target: { value: "email" } });

//   expect(getByDisplayValue("email").id).toBe("email");
//   expect(getByDisplayValue("email").name).toBe("email");
//   expect(getByDisplayValue("email").placeholder).toBe("Email");
//   expect(getByDisplayValue("email").value).toBe("email");
// });
