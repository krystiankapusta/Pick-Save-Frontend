import type { AddProductForm } from '../Models/Product';
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
