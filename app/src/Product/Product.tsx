/* eslint-disable no-octal-escape */

/**
 * Product component to display product details.
 * It renders a title and description, with default values if they are not provided.
 * The title is prefixed with a checkmark symbol.
 *
 * @param title - The title of the product.
 * @param description - The description of the product.
 * @returns a dt and dd element containing the product title and description.
 */
export function Product({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <dt className="before:content-['\2713'] before:p-1 before:text-green-700">
        {title || "No title"}
      </dt>
      <dd className="text-sm">{description || "No description"}</dd>
    </>
  );
}
