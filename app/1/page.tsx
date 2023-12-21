"use client";

import { getProducts } from "@/api";
import Product from "@/components/1/Product";
import { Product as _Product } from "@/types/api.types";
import { useEffect, useState } from "react";

export default function Task_1(): JSX.Element {
  const [products, setProducts] = useState<_Product[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      setLoading(true);
      getProducts().then((res) => {
        if (res instanceof Error) {
          return;
        }
        if (res.count > 0) {
          const sortedProducts = Object.entries(res.products).sort(
            ([, a], [, b]) => parseInt(b.popularity) - parseInt(a.popularity)
          );
          setProducts(sortedProducts.map(([, product]) => product));
        }
      });
    } catch (error) {
      setProducts(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="flex min-h-screen max-w-screen flex-col items-center justify-between p-16 max-sm:p-6 lg:p-24 gap-16">
      <h1 className="text-2xl sm:text-4xl font-bold dark:drop-shadow-[0_0_0.3rem_#ffffff70] text-center">
        Task 1
      </h1>
      {loading ? (
        <h2 className="flex min-h-screen max-w-screen flex-col items-center justify-between p-16 lg:p-24">
          Products loading...
        </h2>
      ) : products === null ? (
        <h2 className="flex min-h-screen max-w-screen flex-col items-center justify-between text-red-400 p-16 lg:p-24">
          Error fetching products
        </h2>
      ) : products.length === 0 ? (
        <h2 className="flex min-h-screen max-w-screen flex-col items-center justify-between p-16 lg:p-24">
          No products found
        </h2>
      ) : (
        <div className="lg:max-w-full lg:w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:text-left gap-6">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
