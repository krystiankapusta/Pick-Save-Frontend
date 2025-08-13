export type AddProductForm = {
    productName: string;
    brand: string;
    weightValue: number;
    weightUnit: string;
    categories: { categoryName: string }[];
    prices: {
        amount: number;
        currency: string;
        shop: string;
        approved?: boolean;
    }[];
    imageUrl?: string;
    description?: string;
    country: string;
    productionPlace: string;
    approved: boolean;
};

export type Product = AddProductForm & {
    prices: Prices;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type Prices = {
    amount: number;
    currency: string;
    shop: string;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
};
