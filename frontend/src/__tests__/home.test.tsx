import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("should render the home page", () => {
    render(<Home />);
    // expect(screen.getByText('produtos')).toBeInTheDocument();
  });
});
