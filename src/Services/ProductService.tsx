import type { ProductForm, Product, ProductCardProps } from '../Models/Product';
import { product_api } from '../API/ProductAxiosConfig';
export const createProduct = async (addProductForm: ProductForm) => {
    try {
        console.log('Sending data to Product API: ', addProductForm);
        const response = await product_api.post<ProductForm>(
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

export const getProductById = async (id: number) => {
    try {
        console.log('Get product by id function called');
        const response = await product_api.get(`/products/${id}`);
        return response.data;
    } catch (error: any) {
        console.error('Fetch product by id error: ', error);
        throw error;
    }
};

export const editProduct = async (product: ProductForm, id: number) => {
    try {
        const response = await product_api.put(`/products/edit/${id}`, product);
        return response.data;
    } catch (error: any) {
        console.error('Update product by id error: ', error);
        throw error;
    }
};
