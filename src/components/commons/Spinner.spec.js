import { render } from "@testing-library/react";

import Spinner from "./Spinner";

test("should render component", () => {
  const { container } = render(<Spinner />);

  expect(container.firstChild).toHaveClass("spinner");
});
