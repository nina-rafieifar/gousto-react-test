import { ICategory } from "./types";

const BASE_URL = "http://localhost:3001/products/v2.0";
export async function fetchCategories(): Promise<ICategory[] | string> {
  try {
    const response = await fetch(BASE_URL + "/categories", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      const results = data.data as ICategory[];

      // Filter out categories that are not hidden
      return results.filter((category) => !category.hidden);
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
