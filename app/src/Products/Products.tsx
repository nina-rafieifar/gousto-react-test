import { useParams } from "react-router";
import { Product } from "../Product/Product";
import { useProducts } from "./useProducts";
import { useState } from "react";

/**
 * Products component fetches and displays a list of products.
 */
export function Products() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { products, loading, error } = useProducts({ filter: categoryId });
  const [openId, setOpenId] = useState("");

  if (error) {
    return (
      <div>
        <span className="text-lg mb-3">Products</span>
        <dt className="text-red-500">
          An error has happened while fetching the products: {error}
        </dt>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-2">
      <span className="text-lg">Products</span>
      {loading && <p>Loading products...</p>}
      {!loading && products.length === 0 && (
        <p>No products available at the moment.</p>
      )}
      {!loading && products.length > 0 && (
        <dl data-testid="products" className="flex flex-col gap-1">
          {products.map((product) => (
            <Product
              id={product.id}
              key={product.id}
              title={product.title}
              description={product.description}
              open={product.id === openId}
              setOpenId={setOpenId}
            />
          ))}
        </dl>
      )}
    </section>
  );
}
