import { ProductCard } from '../../Components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import type { ProductCardProps } from '../../Models/Product';
import { deleteProduct, displayProducts } from '../../Services/ProductService';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await displayProducts();
                console.log('displayProducts returned:', data);
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products data: ', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteProduct = async (productId: number) => {
        console.log('Delete product with id:', productId);
        try {
            const result: SweetAlertResult = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                color: 'white',
                background: '#2c2c2c',
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
                color: 'white',
                background: '#2c2c2c',
                confirmButtonColor: '#0b8793',
            });

            setProducts((previousProduct) =>
                previousProduct.filter((product) => product.id !== productId)
            );
        } catch (error) {
            console.error('Failed to delete product: ', error);
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
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
