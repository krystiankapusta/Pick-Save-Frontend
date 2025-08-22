import { useEffect } from 'react';
import { editProduct, getProductById } from '../../../Services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import type { Prices, ProductForm } from '../../../Models/Product';
import Button from '../../Button/Button';
import FormInput from '../../FormInput/FormInput';
import addIcon from '../../../assets/addIcon.svg';
import { FormTextarea } from '../../FormTextArea/FormTextArea';
import update_information from '../../../assets/update_information.svg';

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'ADMIN';

    const {
        register,
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<ProductForm>({
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

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'prices',
    });

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

    const onSubmit = async (data: any) => {
        if (!data.prices || data.prices.length === 0) {
            setError('root', {
                type: 'manual',
                message: 'At least one price must be added.',
            });
            return;
        }

        const incompletePrice = data.prices.find(
            (price: Prices) =>
                !price.amount ||
                isNaN(Number(price.amount)) ||
                !price.currency ||
                !price.shop
        );

        if (incompletePrice) {
            setError('root', {
                type: 'manual',
                message: 'All price fields must be fully completed.',
            });
            return;
        }
        try {
            const productPayload: ProductForm = {
                productName: data.productName,
                brand: data.brand,
                weightValue: data.weightValue,
                weightUnit: data.weightUnit,
                categories: data.categories
                    .split(', ')
                    .map((name: string) => ({ categoryName: name.trim() })),
                prices: data.prices.map((price: Prices) => ({
                    amount: parseFloat(price.amount as any),
                    currency: price.currency,
                    shop: price.shop,
                    approved: isAdmin ? data.approved : false,
                })),
                imageUrl: data.imageUrl || '',
                description: data.description || '',
                country: data.country || '',
                productionPlace: data.productionPlace || '',
                approved: isAdmin ? data.approved : false,
            };
            console.log('Payload to update: ', productPayload);

            await editProduct(productPayload, Number(id));
            navigate('/products/display-all');
        } catch (error: any) {
            console.error('Failed to update product', error);
            setError('root', {
                type: 'server',
                message:
                    error.message || 'Product update failed. Please try again.',
            });
        }
    };

    return (
        <section className="flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-800">
            <div className="hidden md:block md:w-1/4 p-6">
                <img alt="Update information" src={update_information} />
            </div>
            <div className="flex flex-col justify-center items-center w-full bg-gray-200 shadow-lg rounded-xl p-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-1/2 space-y-6 p-2 gap-1"
                >
                    <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                    <FormInput
                        className="w-full text-sm border border-gray-400 rounded-md p-1"
                        label="Product name"
                        type="text"
                        name="productName"
                        register={register}
                        registerOptions={{
                            required: 'Product name is required',
                            pattern: {
                                value: /^[\p{L}0-9 _-]{3,30}$/u,
                                message:
                                    'Product name must be 3-30 characters long',
                            },
                        }}
                        error={errors.productName?.message}
                        required
                    />
                    <FormInput
                        className="w-full text-sm border border-gray-400 rounded-md p-1"
                        label="Brand"
                        type="text"
                        name="brand"
                        register={register}
                        registerOptions={{
                            required: 'Brand name is required',
                            pattern: {
                                value: /^[\p{L}0-9 _-]{3,50}$/u,
                                message: 'Brand must be 3-30 characters long',
                            },
                        }}
                        error={errors.brand?.message}
                        required
                    />
                    <FormInput
                        className="w-full text-sm border border-gray-400 rounded-md p-1"
                        label="Weight value"
                        type="text"
                        name="weightValue"
                        placeholder="Enter weight value"
                        register={register}
                        registerOptions={{
                            required: 'Weight value is required',
                            pattern: {
                                value: /^[0-9_.]{1,5}$/,
                                message: 'Weight must be 3-30 characters long',
                            },
                        }}
                        error={errors.weightValue?.message}
                        required
                    />
                    <div className="form-group font-bold">
                        <label htmlFor="Weight unit" className="font-bold mr-2">
                            Weight unit
                        </label>
                        <select
                            id="WeightUnit"
                            className="form-control border border-gray-400 rounded-md p-0.5"
                            {...register('weightUnit', {
                                required: 'Weight unit is required',
                            })}
                            required
                        >
                            <option value="">Unit</option>
                            <option>g</option>
                            <option>kg</option>
                            <option>ml</option>
                            <option>l</option>
                        </select>
                        {
                            <p className="text-red-500 text-sm">
                                {errors.weightUnit?.message}
                            </p>
                        }
                    </div>
                    <FormInput
                        className="w-full text-sm border border-gray-400 rounded-md p-1"
                        label="Categories"
                        type="text"
                        name="categories"
                        placeholder="e.g. Protein, Fats"
                        register={register}
                        registerOptions={{
                            required: 'Category is required',
                            pattern: {
                                value: /^[\p{L}0-9 ,.-]{3,}$/u,
                                message:
                                    'Category name must be at least 3 characters long',
                            },
                        }}
                        error={errors.categories?.message}
                        required
                    />

                    <div>
                        {fields.map((field, index) => (
                            <div key={field.id} className="border mb-2 rounded">
                                <div className="flex items-end">
                                    <FormInput
                                        className="w-40 text-sm border border-gray-400 rounded-md p-1 mr-2"
                                        label={`Amount (Shop ${index + 1})`}
                                        name={`prices.${index}.amount`}
                                        placeholder="e.g. 2.99"
                                        type="text"
                                        register={register}
                                        registerOptions={{
                                            required: 'Amount is required',
                                            pattern: {
                                                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                                message:
                                                    'Amount must be a valid number e.g. 2.99',
                                            },
                                        }}
                                        error={
                                            errors.prices?.[index]?.amount
                                                ?.message
                                        }
                                        required
                                    />

                                    <select
                                        className="flex h-7 w-15 font-bold text-sm bg-transparent"
                                        {...register(
                                            `prices.${index}.currency`,
                                            {
                                                required:
                                                    'Currency is required',
                                            }
                                        )}
                                        required
                                    >
                                        <option value="">Currency</option>
                                        <option value="PLN">PLN</option>
                                        <option value="USD">USD</option>
                                        <option value="PLN">EUR</option>
                                        <option value="USD">GBP</option>
                                    </select>
                                    {errors.prices?.[index]?.currency && (
                                        <p className="text-red-500 text-sm">
                                            {
                                                errors.prices[index].currency
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                <FormInput
                                    className="w-full text-sm border border-gray-400 rounded-md p-1"
                                    label="Shop"
                                    type="text"
                                    name={`prices.${index}.shop`}
                                    register={register}
                                    registerOptions={{
                                        required: 'Shop is required',
                                        pattern: {
                                            value: /^[\p{L}0-9 _-]{3,20}$/u,
                                            message:
                                                'Shop name must be 3 - 20 characters long',
                                        },
                                    }}
                                    error={
                                        errors.prices?.[index]?.shop?.message
                                    }
                                    required
                                />

                                <Button
                                    className="w-34 mt-4"
                                    type="button"
                                    label="Remove Price"
                                    variant="danger"
                                    onClick={() => remove(index)}
                                />
                            </div>
                        ))}

                        <Button
                            type="button"
                            icon={
                                <img src={addIcon} alt="" className="w-9 h-9" />
                            }
                            variant="transparent"
                            onClick={() =>
                                append({
                                    amount: 2.99,
                                    currency: '',
                                    shop: '',
                                })
                            }
                        />
                    </div>
                    <FormInput
                        className="w-full text-sm border border-gray-400 rounded-md p-1"
                        label="Image URL"
                        type="text"
                        name="imageUrl"
                        placeholder="Enter image URL"
                        register={register}
                        registerOptions={{
                            pattern: {
                                value: /^[a-zA-Z]{10,}$/,
                                message: 'Incorrect URL address structure',
                            },
                        }}
                        error={errors.imageUrl?.message}
                    />
                    <FormTextarea
                        className="w-full text-sm border border-gray-400 rounded-md p-1"
                        label="Description"
                        name="description"
                        placeholder="Enter description"
                        register={register}
                        registerOptions={{
                            pattern: {
                                value: /^[a-zA-Z0-9_., \S]{0,255}$/,
                                message:
                                    'Description must be max long at 255 characters',
                            },
                        }}
                        error={errors.description?.message}
                    />
                    <FormInput
                        className="w-full text-sm border border-gray-400 rounded-md p-1"
                        label="Country"
                        type="text"
                        name="country"
                        placeholder="Enter country"
                        register={register}
                        registerOptions={{
                            pattern: {
                                value: /^[\p{L}0-9 ,.-]{3,}$/u,
                                message:
                                    'Country name must be at least 3 characters long',
                            },
                        }}
                        error={errors.country?.message}
                    />
                    <FormInput
                        className="w-full text-sm border border-gray-400 rounded-md p-1"
                        label="Production place"
                        type="text"
                        name="productionPlace"
                        placeholder="Enter production place"
                        register={register}
                        registerOptions={{
                            pattern: {
                                value: /^[\p{L}0-9 ,.-]{3,}$/u,
                                message:
                                    'Production place name must be at least 3 characters long',
                            },
                        }}
                        error={errors.productionPlace?.message}
                    />

                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            variant="success"
                            label="Save Changes"
                        />
                        <Button
                            type="button"
                            variant="secondary"
                            label="Cancel"
                            onClick={() => navigate('/products/display-all')}
                        />
                    </div>

                    {errors.root?.message && (
                        <p className="text-red-500 text-sm mb-4">
                            {errors.root.message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default EditProduct;
