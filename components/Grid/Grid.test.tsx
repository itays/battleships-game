import { render } from "@testing-library/react";
import Grid from "./Grid";

describe("Grid", () => {
  it("should render", () => {
    const { container } = render(<Grid />);
    expect(container).toBeInTheDocument();
  });
});
