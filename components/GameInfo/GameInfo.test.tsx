import { render } from "@testing-library/react";
import GameInfo from "./GameInfo";

describe("GameInfo", () => {
  it("should render", () => {
    const { container } = render(<GameInfo />);
    expect(container).toBeInTheDocument();
  });
});
