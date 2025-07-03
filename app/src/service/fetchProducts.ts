import { IProduct } from "./types";

const BASE_URL = "http://localhost:3001/products/v2.0";

export async function fetchProducts(): Promise<IProduct[] | string> {
  try {
    const response = await fetch(BASE_URL + "/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      return data.data as IProduct[];
    }

    return Promise.reject(`Error: ${response.status} - ${response.statusText}`);
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    } else {
      return Promise.reject("An unknown error occurred");
    }
  }
}
