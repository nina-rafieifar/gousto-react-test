import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "./useProducts";
import * as fetchProductsModule from "../service/fetchProducts";
import { IProduct } from "../service/types";

const mockProducts: IProduct[] = [
  {
    id: "1",
    title: "Product 1",
    description: "Desc 1",
    categories: ["cat1", "cat2"],
  },
  {
    id: "2",
    title: "Product 2",
    description: "Desc 2",
    categories: ["cat2", "cat3"],
  },
];

describe("useProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and sets products successfully", async () => {
    jest
      .spyOn(fetchProductsModule, "fetchProducts")
      .mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets error if fetchProducts returns a string error", async () => {
    jest
      .spyOn(fetchProductsModule, "fetchProducts")
      .mockResolvedValueOnce("Network error");

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Network error");
  });

  it("filters products by category if filter is provided", async () => {
    jest
      .spyOn(fetchProductsModule, "fetchProducts")
      .mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useProducts({ filter: "cat1" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([mockProducts[0]]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("returns empty array if filter does not match any product", async () => {
    jest
      .spyOn(fetchProductsModule, "fetchProducts")
      .mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useProducts({ filter: "catX" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets error if fetchProducts throws", async () => {
    jest
      .spyOn(fetchProductsModule, "fetchProducts")
      .mockRejectedValueOnce(new Error("Failed"));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("An unknown error occurred");
  });

  it("sets error if fetchProducts throws a string", async () => {
    jest
      .spyOn(fetchProductsModule, "fetchProducts")
      .mockRejectedValueOnce("String error");

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("String error");
  });
});
