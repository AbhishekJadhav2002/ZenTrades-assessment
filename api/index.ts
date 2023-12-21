import { Products } from "@/types/api.types";

export async function getProducts(): Promise<Products | Error> {
    try {
        const response = await fetch('https://s3.amazonaws.com/open-to-cors/assignment.json');
        if (!response.ok) {
            return new Error('Failed to fetch products data')
        }

        const products = await response.json() as Products;
        return products;
    } catch (error: any) {
        return new Error(error);
    }
};