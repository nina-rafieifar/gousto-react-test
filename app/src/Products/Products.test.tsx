/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-find-by */
import { render, screen, waitFor } from "@testing-library/react";
import { Products } from "./Products";
import { MemoryRouter } from "react-router";

const renderWithRouter = (ui: React.ReactElement, initialEntries = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
  );
};

describe("Products", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product titles and descriptions correctly", async () => {
    const mockProducts = [
      { id: "1", title: "Alpha", description: "First", categories: [] },
      { id: "2", title: "Beta", description: "Second", categories: [] },
    ];
    jest
      .spyOn(require("../service/fetchProducts"), "fetchProducts")
      .mockImplementationOnce(() => Promise.resolve(mockProducts));
    renderWithRouter(<Products />);
    expect(await screen.findByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("shows loading state before products are loaded", async () => {
    jest
      .spyOn(require("../service/fetchProducts"), "fetchProducts")
      .mockImplementationOnce(
        () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
      );
    renderWithRouter(<Products />);
    expect(screen.getByText(/Loading products.../i)).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByText(/No products available at the moment/i)
      ).toBeInTheDocument()
    );
  });

  it("renders error message if error is a string", async () => {
    jest
      .spyOn(require("../service/fetchProducts"), "fetchProducts")
      .mockImplementationOnce(() => Promise.reject("Some error"));
    renderWithRouter(<Products />);
    await waitFor(() =>
      expect(
        screen.getByText(/An error has happened while fetching the products/i)
      ).toBeInTheDocument()
    );
  });

  it("renders correctly when categoryId param is undefined", async () => {
    const mockProducts = [
      { id: "1", title: "NoCat", description: "NoCat Desc", categories: [] },
    ];
    jest
      .spyOn(require("../service/fetchProducts"), "fetchProducts")
      .mockImplementationOnce(() => Promise.resolve(mockProducts));
    renderWithRouter(<Products />);
    expect(await screen.findByText("NoCat")).toBeInTheDocument();
    expect(screen.getByText("NoCat Desc")).toBeInTheDocument();
  });

  it("renders nothing but heading if products is empty and not loading", async () => {
    jest
      .spyOn(require("../service/fetchProducts"), "fetchProducts")
      .mockImplementationOnce(() => Promise.resolve([]));
    renderWithRouter(<Products />);
    const heading = await screen.findByText("Products");
    expect(heading).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(/No products available at the moment/i)
      ).toBeInTheDocument();
      expect(screen.queryByTestId("products")).not.toBeInTheDocument();
    });
  });

  it("does not render loading or error if products are present", async () => {
    const mockProducts = [
      { id: "x", title: "X", description: "X desc", categories: [] },
    ];
    jest
      .spyOn(require("../service/fetchProducts"), "fetchProducts")
      .mockImplementationOnce(() => Promise.resolve(mockProducts));
    renderWithRouter(<Products />);
    expect(await screen.findByText("X")).toBeInTheDocument();
    expect(screen.queryByText(/Loading products.../i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/An error has happened/i)
    ).not.toBeInTheDocument();
  });
});
