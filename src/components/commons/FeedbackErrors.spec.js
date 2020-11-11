import { render } from "@testing-library/react";

import FeedbackErrors from "./FeedbackErrors";

test("should render component", () => {
  const user = {
    email: "email is required",
    password: "password is required",
  };

  const { getByRole } = render(<FeedbackErrors errorsForm={user} />);

  expect(getByRole("alert").children).toHaveLength(2);
});

test("should show 'Please fix the following errors'", () => {
  const user = {
    email: "email is required",
    password: "password is required",
  };

  const { getByText } = render(<FeedbackErrors errorsForm={user} />);

  expect(getByText(/please fix the following errors/i)).toBeTruthy();
});

test("should <li> length 2", () => {
  const user = {
    email: "email is required",
    password: "password is required",
  };

  const { queryAllByRole } = render(<FeedbackErrors errorsForm={user} />);

  const lis = queryAllByRole("listitem");

  expect(lis.length).toBe(2);
});

test("should show 2 tags <li>", () => {
  const user = {
    email: "email is required",
    password: "password is required",
  };

  const { queryAllByRole } = render(<FeedbackErrors errorsForm={user} />);

  const lis = queryAllByRole("listitem");

  expect(lis[0]).toHaveTextContent("email is required");
  expect(lis[1]).toHaveTextContent("password is required");
});
