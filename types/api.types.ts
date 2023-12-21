export type Product = {
    subcategory: string;
    title: string;
    price: string;
    popularity: string;
};

export type Products = {
    count: number;
    products: {
        [key: string]: Product;
    }
};