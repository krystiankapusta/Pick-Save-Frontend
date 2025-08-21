import type { ProductCardProps } from '../../Models/Product';
import Button from '../Button/Button';
import edit_icon from '../../assets/edit_icon.svg';
import bin_icon from '../../assets/bin_icon.svg';
import empty_image from '../../assets/empty_image.svg';

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    imageUrl,
    productName,
    brand,
    weightValue,
    weightUnit,
    onEdit,
    onDelete,
}) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'ADMIN';
    return (
        <div className="rounded shadow-md p-4 max-w-xs">
            <img
                src={imageUrl || empty_image}
                alt={productName}
                className={`w-full h-40 rounded ${imageUrl ? 'object-cover' : 'object-contain p-6 bg-gray-100'}`}
            />
            <h3 className="mt-2 text-lg font-bold">{productName}</h3>
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
