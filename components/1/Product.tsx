import { Product } from "@/types/api.types";

export default function Product({
  product,
}: {
  product: Product;
}): JSX.Element {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 bg-gray-100 hover:dark:border-neutral-700 dark:bg-neutral-800/30">
      <h5 className="mb-4 text-xl max-md:text-lg font-medium text-gray-500 dark:text-gray-400">
        {product.title}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-2xl max-md:text-lg font-semibold">$</span>
        <span className="text-4xl max-md:text-2xl font-bold tracking-tight">
          {product.price}
        </span>
        <span className="ml-2 ms-1 text-xl max-md:text-sm font-normal text-gray-500 dark:text-gray-400">
          ({product.popularity})
        </span>
      </div>
    </div>
  );
}
