/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Categories } from "./Categories";
import * as fetchCategoriesModule from "../service/fetchCategories";
import { MemoryRouter } from "react-router";

jest.mock("../service/fetchCategories");

const mockCategories = [
  { id: "1", title: "Drinks Cabinet" },
  { id: "2", title: "Kitchenware" },
];

function renderWithRouter(ui: React.ReactElement, route: string = "/") {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe("Categories", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockReturnValue(
      new Promise(() => {})
    );
    renderWithRouter(<Categories />);
    expect(screen.getByText(/Loading categories/i)).toBeInTheDocument();
  });

  it("renders categories after successful fetch", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue(
      mockCategories
    );
    renderWithRouter(<Categories />);
    await waitFor(() => {
      expect(screen.getByText("Drinks Cabinet")).toBeInTheDocument();
      expect(screen.getByText("Kitchenware")).toBeInTheDocument();
    });
  });

  it("renders error message if fetch returns a string error", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue(
      "Network error"
    );
    renderWithRouter(<Categories />);
    await waitFor(() => {
      expect(screen.getByText(/An error has happened/i)).toBeInTheDocument();
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

  it("renders error message if fetch throws an error", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockRejectedValue(
      "Server down"
    );
    renderWithRouter(<Categories />);
    await waitFor(() => {
      expect(screen.getByText(/An error has happened/i)).toBeInTheDocument();
      expect(screen.getByText(/Server down/i)).toBeInTheDocument();
    });
  });

  it("renders fallback error message if fetch throws a non-string error", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockRejectedValue({});
    renderWithRouter(<Categories />);
    await waitFor(() => {
      expect(
        screen.getByText(/An unknown error occurred/i)
      ).toBeInTheDocument();
    });
  });

  it("renders message when no categories are available", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue([]);
    renderWithRouter(<Categories />);
    await waitFor(() => {
      expect(screen.getByText(/No categories available/i)).toBeInTheDocument();
    });
  });

  it("highlights selected category when clicked", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue(
      mockCategories
    );
    renderWithRouter(<Categories />);
    await waitFor(() => {
      expect(screen.getByText("Drinks Cabinet")).toBeInTheDocument();
    });
    const drinksLink = screen.getByText("Drinks Cabinet");
    fireEvent.click(drinksLink);
    expect(drinksLink).toHaveClass("font-bold");
  });

  it("highlights selected category when activated by keyboard", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue(
      mockCategories
    );
    renderWithRouter(<Categories />);
    await waitFor(() => {
      expect(screen.getByText("Kitchenware")).toBeInTheDocument();
    });
    const kitchenwareLink = screen.getByText("Kitchenware");
    kitchenwareLink.focus();
    fireEvent.keyDown(kitchenwareLink, { key: "Enter", code: "Enter" });
    expect(kitchenwareLink).toHaveClass("font-bold");
  });

  it("highlights selected category when activated by spacebar", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue(
      mockCategories
    );
    renderWithRouter(<Categories />);
    await waitFor(() => {
      expect(screen.getByText("Kitchenware")).toBeInTheDocument();
    });
    const kitchenwareLink = screen.getByText("Kitchenware");
    kitchenwareLink.focus();
    fireEvent.keyDown(kitchenwareLink, { key: " ", code: "Space" });
    expect(kitchenwareLink).toHaveClass("font-bold");
  });

  it("category links have correct aria-labels", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue(
      mockCategories
    );
    renderWithRouter(<Categories />);
    await waitFor(() => {
      expect(
        screen.getByLabelText(
          "Display products for the category: Drinks Cabinet"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Display products for the category: Kitchenware")
      ).toBeInTheDocument();
    });
  });

  it("category links have correct hrefs", async () => {
    (fetchCategoriesModule.fetchCategories as jest.Mock).mockResolvedValue(
      mockCategories
    );
    renderWithRouter(<Categories />);
    await waitFor(() => {
      expect(screen.getByText("Drinks Cabinet").closest("a")).toHaveAttribute(
        "href",
        "/1"
      );
      expect(screen.getByText("Kitchenware").closest("a")).toHaveAttribute(
        "href",
        "/2"
      );
    });
  });
});
