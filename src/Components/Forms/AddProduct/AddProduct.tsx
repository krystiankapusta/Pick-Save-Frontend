import type {
    ProductForm,
    ProductPayload,
    Prices,
} from '../../../Models/Product';
import { useForm, useFieldArray } from 'react-hook-form';
import FormInput from '../../FormInput/FormInput';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../Services/ProductService';
import add_information from '../../../assets/add_information.svg';
import addIcon from '../../../assets/addIcon.svg';
import { FormTextarea } from '../../FormTextArea/FormTextArea';
const AddProduct = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'ADMIN';

    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ProductForm>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'prices',
    });
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
            console.log(
                'On submit function before send request to create product'
            );

            const productPayload: ProductPayload = {
                ...data,
                categories: data.categories
                    .split(',')
                    .map((name: string) => ({ categoryName: name.trim() }))
                    .filter(
                        (c: { categoryName: string }) =>
                            c.categoryName.length > 0
                    ),
                prices: data.prices.map((price: Prices) => ({
                    ...price,
                    amount: parseFloat(price.amount as any),
                    approved: isAdmin ? data.approved : false,
                })),
                countries: data.countries
                    .split(',')
                    .map((name: string) => name.trim())
                    .filter((name: string) => name.length > 0),
                approved: isAdmin ? data.approved : false,
            };

            const response = await createProduct(productPayload);
            console.log(
                'On submit function response during creating product: ',
                response
            );
            navigate('/main');
        } catch (error: any) {
            console.error('Failed to add product at onSubmit function', error);
            const errorMessage = error.message;
            console.error('Error message: ', errorMessage);
            setError('root', {
                type: 'server',
                message:
                    errorMessage || 'Product create failed. Please try again.',
            });
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <section className="flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-800">
            <div className="hidden md:block md:w-1/4 p-6">
                <img alt="Add information" src={add_information} />
            </div>
            <div className="flex flex-col justify-center items-center w-full bg-gray-200 dark:bg-zinc-700 shadow-lg rounded-xl p-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-1/2 space-y-6 p-2 gap-1"
                >
                    <FormInput
                        className="w-full text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-1"
                        label="Product name"
                        type="text"
                        name="productName"
                        placeholder="Enter product name"
                        register={register}
                        registerOptions={{
                            required: 'Product name is required',
                            pattern: {
                                value: /^[a-zA-Z0-9_]{3,30}$/u,
                                message:
                                    'Product name must be 3-30 characters long',
                            },
                        }}
                        error={errors.productName?.message}
                        required
                    />
                    <FormInput
                        className="w-full text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-1"
                        label="Brand"
                        type="text"
                        name="brand"
                        placeholder="Enter brand"
                        register={register}
                        registerOptions={{
                            required: 'Brand name is required',
                            pattern: {
                                value: /^[a-zA-Z0-9_]{3,30}$/,
                                message: 'Brand must be 3-30 characters long',
                            },
                        }}
                        error={errors.brand?.message}
                        required
                    />
                    <FormInput
                        className="w-full text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-1"
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
                        <label
                            htmlFor="Weight unit"
                            className="dark:text-white font-bold mr-2"
                        >
                            Weight unit
                        </label>
                        <select
                            id="WeightUnit"
                            className="form-control dark:text-gray-100 dark:bg-gray-500 border border-gray-400 rounded-md p-0.5"
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
                        className="w-full text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-1"
                        label="Categories"
                        type="text"
                        name="categories"
                        placeholder="e.g. Protein, Fats"
                        register={register}
                        registerOptions={{
                            required: 'At least one category is required',
                            pattern: {
                                value: /^[\p{L} ]+(?:\s*,\s*[\p{L} ]+)*$/u,
                                message: 'Enter at least one valid category',
                            },
                        }}
                        error={errors.categories?.message}
                        required
                    />
                    <div>
                        {fields.map((field, index) => (
                            <div key={field.id} className="mb-2 rounded">
                                <div className="flex items-end">
                                    <FormInput
                                        className="w-40 text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-1 mr-2"
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
                                        className="flex h-7 w-15 font-bold text-sm dark:text-gray-100 bg-transparent"
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
                                    className="w-full text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-1"
                                    label="Shop"
                                    type="text"
                                    name={`prices.${index}.shop`}
                                    register={register}
                                    registerOptions={{
                                        required: 'Shop is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9]{3,20}$/,
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
                                <img
                                    src={addIcon}
                                    alt=""
                                    className="w-9 h-9 dark:invert dark:brightness-50"
                                />
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
                        className="w-full text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-1"
                        label="Image URL"
                        type="url"
                        name="imageUrl"
                        placeholder="Enter image URL"
                        register={register}
                        error={errors.imageUrl?.message}
                    />
                    <FormTextarea
                        className="w-full text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-1"
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
                        className="w-full text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-1"
                        label="Countries"
                        type="text"
                        name="countries"
                        placeholder="Enter country"
                        register={register}
                        registerOptions={{
                            pattern: {
                                value: /^[\p{L}0-9 ]+(?:\s*,\s*[\p{L}0-9 ]+)*$/u,
                                message:
                                    'Enter valid countries separated by commas',
                            },
                        }}
                        error={errors.countries?.message}
                    />
                    <FormInput
                        className="w-full text-sm dark:bg-gray-300 border border-gray-400 rounded-md p-1"
                        label="Production place"
                        type="text"
                        name="productionPlace"
                        placeholder="Enter production place"
                        register={register}
                        registerOptions={{
                            pattern: {
                                value: /^[a-zA-Z]{3,}$/,
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
                            label="Create"
                        />
                        <Button
                            type="button"
                            variant="secondary"
                            label="Cancel"
                            onClick={() => handleNavigation(`/main`)}
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

export default AddProduct;
