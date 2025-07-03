import { fetchCategories } from "./fetchCategories";

// Mock the global fetch function
global.fetch = jest.fn();

describe("fetchCategories", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return categories array when response is ok", async () => {
    const mockCategories = ["Drinks Cabinet"];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockCategories }),
    });

    const result = await fetchCategories();
    expect(result).toEqual(mockCategories);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3001/products/v2.0/categories",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
  });

  it("should reject with error message when response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(fetchCategories()).rejects.toEqual("Error: 404 - Not Found");
  });

  it("should reject with error message when fetch throws an Error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchCategories()).rejects.toEqual("Network error");
  });

  it("should reject with unknown error when fetch throws a non-Error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce("Some string error");

    await expect(fetchCategories()).rejects.toEqual(
      "An unknown error occurred"
    );
  });

  it("should filter out hidden categories", async () => {
    const mockCategories = [
      { id: "1", title: "Drinks Cabinet", hidden: false },
      { id: "2", title: "Hidden Category", hidden: true },
    ];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockCategories }),
    });

    const result = await fetchCategories();
    expect(result).toEqual([
      { id: "1", title: "Drinks Cabinet", hidden: false },
    ]);
  });
});
