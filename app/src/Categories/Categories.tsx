import { useState, useEffect } from "react";
import { fetchCategories } from "../service/fetchCategories";
import { ICategory } from "../service/types";

export function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      if (typeof response === "string") {
        setError(response);
      } else {
        setCategories(response);
      }
    } catch (error) {
      setError(typeof error === "string" ? error : "An unknown error occurred");
    }
    setLoading(false);
  };

  useEffect(() => {
    void getCategories();
  }, []);

  if (error) {
    return (
      <div>
        <h2 className="text-2xl mb-3">Categories</h2>
        <dt className="text-red-500">
          An error has happened while fetching the categories: {error}
        </dt>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl">Categories</h2>
      {loading && <p>Loading categories...</p>}
      {!loading && categories.length === 0 && (
        <p>No categories available at the moment.</p>
      )}
      {!loading && categories.length > 0 && (
        <ul className="list-disc pl-5">
          {categories.map((category) => (
            <li key={category.id}>{category.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
