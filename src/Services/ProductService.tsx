import type {
    AddProductForm,
    Product,
    ProductCardProps,
} from '../Models/Product';
import { product_api } from '../API/ProductAxiosConfig';
export const createProduct = async (addProductForm: AddProductForm) => {
    try {
        console.log('Sending data to Product API: ', addProductForm);
        const response = await product_api.post<AddProductForm>(
            `/products/create`,
            addProductForm
        );
        return response.data;
    } catch (error: any) {
        console.error('Create product error: ', error);
        throw error;
    }
};

export const displayProducts = async (): Promise<ProductCardProps[]> => {
    try {
        const response = await product_api.get<ProductCardProps[]>(
            `/products/display-all`
        );
        return response.data;
    } catch (error: any) {
        console.error('Display products data error: ', error);
        throw error;
    }
};

export const deleteProduct = async (id: number | undefined) => {
    try {
        const response = await product_api.delete<Product>(
            `/products/delete/${id}`
        );
        return response.data;
    } catch (error: any) {
        console.error('Delete products data error: ', error);
        throw error;
    }
};
