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
  id,
  open,
  title,
  description,
  setOpenId,
}: {
  id: string;
  open?: boolean;
  title: string;
  description: string;
  setOpenId?: (id: string) => void;
}) {
  return (
    <>
      <dt
        className="cursor-pointer before:content-['\2713'] before:p-1 before:text-green-700 hover:text-green-700 focus-visible:underline "
        tabIndex={0} // Make it focusable for keyboard navigation
        aria-label={`Display description for ${title}`}
        onClick={(e) => {
          if (setOpenId) {
            setOpenId(id);
          }
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && setOpenId) {
            setOpenId(id);
          }
        }}
        onTouchEnd={() => {
          if (setOpenId) {
            setOpenId(id);
          }
        }}
      >
        {title || "No title"}
      </dt>
      <dd
        className={`text-sm pl-6 motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-in overflow-hidden ${
          open ? "opacity-100 h-auto mb-2" : "opacity-0 h-0"
        }`}
      >
        {description || "No description"}
      </dd>
    </>
  );
}
