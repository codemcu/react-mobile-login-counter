import { render } from "@testing-library/react";

import FeedbackInline from "./FeedbackInline";

test("should show 2 messages alert", () => {
  const { queryAllByRole } = render(
    <FeedbackInline
      error='email is required'
      validation='password is required'
    />
  );

  const alerts = queryAllByRole("alert");

  expect(alerts.length).toBe(2);
});

test("should show 'email is required' text alert", () => {
  const { queryAllByRole } = render(
    <FeedbackInline error='email is required' />
  );

  const alerts = queryAllByRole("alert");

  expect(alerts[0]).toHaveTextContent("email is required");
});

test("should show 'password is required' text alert", () => {
  const { queryAllByRole } = render(
    <FeedbackInline validation='password is required' />
  );

  const alerts = queryAllByRole("alert");

  expect(alerts[1]).toHaveTextContent("password is required");
});
