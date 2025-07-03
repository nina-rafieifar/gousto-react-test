import { useEffect, useState } from "react";
import { Product } from "../Product/Product";
import { fetchProducts } from "../service/fetchProducts";
import { IProduct } from "../service/types";

/**
 * Products component fetches and displays a list of products.
 */
export function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      const response = await fetchProducts();
      if (typeof response === "string") {
        setError(response);
      } else {
        setProducts(response);
      }
    } catch (error) {
      setError(typeof error === "string" ? error : "An unknown error occurred");
    }
    setLoading(false);
  };

  useEffect(() => {
    void getProducts();
  }, []);

  if (error) {
    return (
      <div>
        <h2 className="text-2xl mb-3">Products</h2>
        <dt className="text-red-500">
          An error has happened while fetching the products: {error}
        </dt>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl">Products</h2>
      {loading && <p>Loading products...</p>}
      {!loading && products.length === 0 && (
        <p>No products available at the moment.</p>
      )}
      {!loading && products.length > 0 && (
        <dl data-testid="products" className="flex flex-col gap-4">
          {products.map((product) => (
            <Product
              key={product.id}
              title={product.title}
              description={product.description}
            />
          ))}
        </dl>
      )}
    </section>
  );
}
