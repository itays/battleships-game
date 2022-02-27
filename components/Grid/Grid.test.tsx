import { render } from "@testing-library/react";
import Grid from "./Grid";

describe("Grid", () => {
  it("should render", () => {
    const { container } = render(<Grid type="user" />);
    expect(container).toBeInTheDocument();
  });
});
