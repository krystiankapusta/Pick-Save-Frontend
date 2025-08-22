export type ProductForm = {
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

export type Product = ProductForm & {
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

export interface ProductCardProps {
    id: number;
    imageUrl?: string;
    productName: string;
    brand: string;
    weightValue: number;
    weightUnit: string;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}
