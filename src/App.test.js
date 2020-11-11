import { render } from "@testing-library/react";
import App from "./App";

test("should render component", () => {
  render(<App />);

  expect(document.querySelector(".form")).toBeInTheDocument();
});
