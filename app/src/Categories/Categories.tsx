import { useState, useEffect } from "react";
import { fetchCategories } from "../service/fetchCategories";
import { ICategory } from "../service/types";
import { Link, useParams } from "react-router";
import { Products } from "../Products/Products";

export function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(categoryId);

  useEffect(() => {
    setSelectedCategoryId(categoryId);
  }, [categoryId]);

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

  const handleCategoryClick = (id: string) => {
    setSelectedCategoryId(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Prevent default action for Enter/Space keys
      setSelectedCategoryId(id);
    }
  };

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
            <li key={category.id}>
              <Link
                to={"/" + category.id}
                aria-label={
                  "Display products for the category: " + category.title
                }
                onClick={() => handleCategoryClick(category.id)}
                onKeyDown={(e) => handleKeyDown(e, category.id)}
                onTouchEnd={() => handleCategoryClick(category.id)}
                className={`hover:underline focus-visible:underline ${
                  selectedCategoryId === category.id ? "font-bold" : ""
                }`}
                id={category.id}
              >
                {category.title}
              </Link>
              <article className="border border-gray-300 p-2 my-2 rounded-sm empty:hidden">
                {selectedCategoryId === category.id && <Products />}
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
