import { render, screen } from "@testing-library/react";
import { Product } from "./Product";

describe("Product", () => {
  it("renders the product", () => {
    render(<Product title="Test Product" description="Test Description" />);

    expect(screen.getByRole("term")).toHaveTextContent("Test Product");
    expect(screen.getByRole("definition")).toHaveTextContent(
      "Test Description"
    );
  });

  it("Displays 'No title' when the product title is missing", () => {
    render(<Product title="" description="Test Description" />);

    expect(screen.getByRole("term")).toHaveTextContent("No title");
  });
  it("Displays 'No description' when the product description is missing", () => {
    render(<Product title="Test Product" description="" />);

    expect(screen.getByRole("definition")).toHaveTextContent("No description");
  });
});
