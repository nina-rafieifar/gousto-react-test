import { render, screen } from "@testing-library/react";
import { Products } from "./Products";

describe("Products", () => {
  it("renders the products", async () => {
    const mockProducts = [
      { id: "1", title: "Product 1", description: "Desc 1" },
      { id: "2", title: "Product 2", description: "Desc 2" },
    ];
    jest
      .spyOn(require("../service/fetchProducts"), "fetchProducts")
      .mockImplementationOnce(() => Promise.resolve(mockProducts));
    render(<Products />);
    const productsList = await screen.findByTestId("products");
    expect(productsList).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
  it("shows loading state initially", () => {
    render(<Products />);
    expect(screen.getByText(/Loading products.../i)).toBeInTheDocument();
  });

  it("shows error message when error occurs", async () => {
    jest
      .spyOn(require("../service/fetchProducts"), "fetchProducts")
      .mockImplementationOnce(() => Promise.resolve("Network error"));
    render(<Products />);
    const errorMsg = await screen.findByText(
      /An error has happened while fetching the products/i
    );
    expect(errorMsg).toBeInTheDocument();
  });

  it("shows no products message when products array is empty", async () => {
    jest
      .spyOn(require("../service/fetchProducts"), "fetchProducts")
      .mockImplementationOnce(() => Promise.resolve([]));
    render(<Products />);
    const noProductsMsg = await screen.findByText(
      /No products available at the moment/i
    );
    expect(noProductsMsg).toBeInTheDocument();
  });
});
