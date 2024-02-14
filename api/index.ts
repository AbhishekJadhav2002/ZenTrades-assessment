import { Products, UserJobs } from "@/types/api.types";

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

export async function getUserJobs(): Promise<UserJobs[] | Error> {
    try {
        const response = await fetch('/api/plan', {
            headers: {
                "Authorization": "1"
            }
        });
        if (!response.ok) {
            return new Error('Failed to fetch user jobs')
        }

        const jobs = await response.json();
        return jobs.data as UserJobs[];
    } catch (error: any) {
        return new Error(error);
    }
};