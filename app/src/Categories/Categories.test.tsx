/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from "@testing-library/react";
import { Categories } from "./Categories";
import * as fetchCategoriesModule from "../service/fetchCategories";

jest.mock("../service/fetchCategories");

const mockCategories = [
  { id: "1", title: "Drinks Cabinet" },
  { id: "2", title: "Kitchenware" },
];

describe("Categories", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockReturnValue(
      new Promise(() => {})
    );
    render(<Categories />);
    expect(screen.getByText(/Loading categories/i)).toBeInTheDocument();
  });

  it("renders categories after successful fetch", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue(
      mockCategories
    );
    render(<Categories />);
    await waitFor(() => {
      expect(screen.getByText("Drinks Cabinet")).toBeInTheDocument();
      expect(screen.getByText("Kitchenware")).toBeInTheDocument();
    });
  });

  it("renders error message if fetch returns a string error", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue(
      "Network error"
    );
    render(<Categories />);
    await waitFor(() => {
      expect(screen.getByText(/An error has happened/i)).toBeInTheDocument();
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

  it("renders error message if fetch throws an error", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockRejectedValue(
      "Server down"
    );
    render(<Categories />);
    await waitFor(() => {
      expect(screen.getByText(/An error has happened/i)).toBeInTheDocument();
      expect(screen.getByText(/Server down/i)).toBeInTheDocument();
    });
  });

  it("renders fallback error message if fetch throws a non-string error", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockRejectedValue({});
    render(<Categories />);
    await waitFor(() => {
      expect(
        screen.getByText(/An unknown error occurred/i)
      ).toBeInTheDocument();
    });
  });

  it("renders message when no categories are available", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue([]);
    render(<Categories />);
    await waitFor(() => {
      expect(screen.getByText(/No categories available/i)).toBeInTheDocument();
    });
  });
});
