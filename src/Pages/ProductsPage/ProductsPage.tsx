import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import type { ProductCardProps } from '../../Models/Product';
import {
    deleteProduct,
    displayProducts,
    getProductById,
    verifyProduct,
} from '../../Services/ProductService';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getAlertColors } from '../../Utils/GetAlertColors';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { Prices, ProductForm } from '../../Models/Product';
const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'ADMIN';

    const { reset } = useForm<ProductForm>({
        defaultValues: {
            productName: '',
            brand: '',
            weightValue: 1,
            weightUnit: '',
            categories: [{ categoryName: '' }],
            prices: [],
            imageUrl: '',
            description: '',
            country: '',
            productionPlace: '',
            approved: false,
        },
    });

    const fetchData = async () => {
        try {
            const data = await displayProducts();
            console.log('displayProducts returned:', data);
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products data: ', error);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const product = await getProductById(Number(id));
                reset({
                    productName: product.productName,
                    brand: product.brand,
                    weightValue: product.weightValue,
                    weightUnit: product.weightUnit,
                    categories: product.categories
                        .map((c: { categoryName: string }) => c.categoryName)
                        .join(', '),
                    prices: product.prices.map((p: Prices) => ({
                        amount: p.amount,
                        currency: p.currency,
                        shop: p.shop,
                    })),
                    imageUrl: product.imageUrl || '',
                    description: product.description || '',
                    country: product.country || '',
                    productionPlace: product.productionPlace || '',
                    approved: isAdmin ? product.approved : false,
                });
            } catch (error) {
                console.error('Failed to fetch product data: ', error);
                navigate('/products/display-all');
            }
        };
        fetchProduct();
    }, [id, reset, navigate, isAdmin]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteProduct = async (productId: number) => {
        console.log('Delete product with id:', productId);
        try {
            const { backgroundColor, textColor } = getAlertColors();
            const result: SweetAlertResult = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                color: textColor,
                background: backgroundColor,
                showCancelButton: true,
                confirmButtonColor: '#0f9b0f',
                cancelButtonColor: '#dd1818',
                confirmButtonText: 'Yes, delete it!',
            });
            if (!result.isConfirmed) {
                return;
            }
            const response = await deleteProduct(productId);
            console.log('Delete response: ', response);
            await Swal.fire({
                title: 'Deleted!',
                text: 'Product has been deleted.',
                icon: 'success',
                color: textColor,
                background: backgroundColor,
                confirmButtonColor: '#0b8793',
            });

            setProducts((previousProduct) =>
                previousProduct.filter((product) => product.id !== productId)
            );
        } catch (error) {
            console.error('Failed to delete product: ', error);
        }
    };

    const handleVerifyProduct = async (productId: number) => {
        console.log('Verify product with id:', productId);
        try {
            const { backgroundColor, textColor } = getAlertColors();
            const product = await getProductById(productId);
            const result: SweetAlertResult = await Swal.fire({
                title: 'Product details',
                html: `
                <div style="text-align:left">
                    <p><strong>Name:</strong> ${product.productName}</p>
                    <p><strong>Brand:</strong> ${product.brand}</p>
                    <p><strong>Weight:</strong> ${product.weightValue} ${product.weightUnit}</p>
                    <p><strong>Categories:</strong> ${product.categories.map((c: { categoryName: string }) => c.categoryName).join(', ')}</p>
                    <p>${product.prices.map((p: Prices) => `<strong>Shop:</strong> ${p.shop} <strong>price:</strong> ${p.amount} ${p.currency} `).join('<br/>')}</p>
                    <p><strong>Country:</strong> ${product.country}</p>
                    <p><strong>Production Place:</strong> ${product.productionPlace}</p>
                </div>
            `,
                icon: 'info',
                color: textColor,
                background: backgroundColor,
                showCancelButton: true,
                confirmButtonColor: '#0f9b0f',
                cancelButtonColor: '#dd1818',
                confirmButtonText: 'Verify it!',
            });
            if (!result.isConfirmed) {
                return;
            }
            const response = await verifyProduct(productId);
            console.log('Verified response: ', response);
            await Swal.fire({
                title: 'Verified!',
                text: 'Product has been verified.',
                icon: 'success',
                color: textColor,
                background: backgroundColor,
                showConfirmButton: false,
                timer: 1500,
            });
            await fetchData();
        } catch (error) {
            console.error('Failed to verify product: ', error);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center mx-8 md:mx-16 lg:mx-32 xl:mx-64">
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        {...p}
                        onEdit={() => navigate(`/products/edit/${p.id}`)}
                        onDelete={() => handleDeleteProduct(p.id)}
                        onVerify={() => handleVerifyProduct(p.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
