import { fetchProducts } from "./fetchProducts";

describe("Products Service", () => {
  const mockFetchData = {
    data: [
      {
        id: "1",
        title: "Product 1",
        description: "Description for Product 1",
      },
    ],
  };

  it("fetches products successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetchData),
        ok: true,
      })
    ) as jest.Mock;

    const results = await fetchProducts();
    expect(results).toBe(mockFetchData.data);
  });

  it("handles the network error to respond with a rejection", async () => {
    const mockError = new Error("Network Error");
    global.fetch = jest.fn(() => Promise.reject(mockError)) as jest.Mock;

    await expect(fetchProducts()).rejects.toEqual("Network Error");
  });

  it("handles the API error and responds with a rejection", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetchData),
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      })
    ) as jest.Mock;
    await expect(fetchProducts()).rejects.toEqual(
      `Error: 500 - Internal Server Error`
    );
  });
});
