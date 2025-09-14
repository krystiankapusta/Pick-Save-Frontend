import type { ProductCardProps } from '../../Models/Product';
import Button from '../Button/Button';
import edit_icon from '../../assets/edit_icon.svg';
import bin_icon from '../../assets/bin_icon.svg';
import empty_image from '../../assets/empty_image.svg';
import verified_icon from '../../assets/verified_icon.svg';
import not_verified_icon from '../../assets/not_verified_icon.svg';

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    imageUrl,
    productName,
    brand,
    weightValue,
    weightUnit,
    approved,
    prices,
    onEdit,
    onDelete,
    onVerify,
}) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'ADMIN';
    const isVerified = approved && prices.every((price) => price.approved);
    return (
        <div className="max-w-xs rounded shadow-md dark:shadow-gray-600 p-4 cursor-pointer transform transition duration-300 hover:scale-105">
            <img
                src={imageUrl || empty_image}
                alt={productName}
                className={`w-full h-40 rounded ${imageUrl ? 'object-cover' : 'object-contain p-6 bg-gray-100'}`}
            />

            <div>
                {isVerified ? (
                    <div className="flex">
                        <h3 className="mt-2 text-lg font-bold dark:text-gray-300">
                            {productName}
                        </h3>
                        <Button
                            type="button"
                            icon={
                                <img
                                    src={verified_icon}
                                    alt="verified_icon"
                                    className="w-5 h-5"
                                />
                            }
                            variant="transparent"
                        />
                    </div>
                ) : (
                    <div className="flex">
                        <h3 className="mt-2 text-lg font-bold dark:text-gray-300">
                            {productName}
                        </h3>
                        <Button
                            type="button"
                            icon={
                                <img
                                    src={not_verified_icon}
                                    alt="not_verified_icon"
                                    className="w-5 h-5"
                                />
                            }
                            variant="transparent"
                            onClick={() => isAdmin && onVerify?.(id)}
                        />
                    </div>
                )}
            </div>
            <p className="text-gray-500">{brand}</p>
            <div className="flex font-bold">
                <p className="text-gray-500">{weightValue}</p>
                <p className="text-gray-500">{weightUnit}</p>
            </div>

            <div className="flex gap-2 mt-4">
                {isAdmin ? (
                    <div className="flex">
                        <Button
                            type="button"
                            icon={
                                <img
                                    src={edit_icon}
                                    alt="edit_icon"
                                    className="w-9 h-9"
                                />
                            }
                            variant="transparent"
                            onClick={() => onEdit?.(id)}
                        />

                        <Button
                            type="button"
                            icon={
                                <img
                                    src={bin_icon}
                                    alt="bin_icon"
                                    className="w-7 h-7"
                                />
                            }
                            variant="transparent"
                            onClick={() => onDelete?.(id)}
                        />
                    </div>
                ) : (
                    <Button
                        type="button"
                        icon={
                            <img
                                src={edit_icon}
                                alt="edit_icon"
                                className="w-9 h-9"
                            />
                        }
                        variant="transparent"
                        onClick={() => onEdit?.(id)}
                    />
                )}
            </div>
        </div>
    );
};
