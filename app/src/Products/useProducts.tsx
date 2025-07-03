import { useState, useEffect } from "react";
import { fetchProducts } from "../service/fetchProducts";
import { IProduct } from "../service/types";

export function useProducts({ filter }: { filter?: string } = {}) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      const response = await fetchProducts();
      if (typeof response === "string") {
        setError(response);
      } else {
        if (filter) {
          // If a filter is provided, filter the products
          const filteredProducts = response.filter((product) =>
            product.categories.some((categoryId) => filter === categoryId)
          );
          setProducts(filteredProducts);
        } else setProducts(response);
      }
    } catch (error) {
      setError(typeof error === "string" ? error : "An unknown error occurred");
    }
    setLoading(false);
  };

  useEffect(() => {
    void getProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
}
