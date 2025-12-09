import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
    onAddToCart?: () => void;
    onToggleWishlist?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    originalPrice,
    image,
    rating,
    reviews,
    isNew,
    onAddToCart,
    onToggleWishlist,
}) => {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
        <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
                <img
                    src={image.startsWith('http') ? image : `http://localhost:5000${image}`}
                    alt={name}
                    className="w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-110 mix-blend-multiply"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {isNew && (
                        <span className="bg-navy text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                            NEW
                        </span>
                    )}
                    {discount > 0 && (
                        <span className="bg-orange text-white text-xs font-bold px-2 py-1 rounded">
                            -{discount}%
                        </span>
                    )}
                </div>

                {/* Actions - Slide in from right */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    <button
                        onClick={onToggleWishlist}
                        className="p-2 bg-white rounded-full text-navy hover:bg-gold hover:text-navy shadow-md transition-colors"
                        aria-label="Add to Wishlist"
                    >
                        <Heart size={18} />
                    </button>
                    <button
                        className="p-2 bg-white rounded-full text-navy hover:bg-gold hover:text-navy shadow-md transition-colors"
                        aria-label="Quick View"
                    >
                        <Eye size={18} />
                    </button>
                </div>

                {/* Add to Cart Button - Slide up from bottom */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <Button
                        variant="primary"
                        fullWidth
                        className="shadow-lg"
                        onClick={onAddToCart}
                    >
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="flex items-center gap-1 mb-1">
                    <div className="flex text-gold text-xs">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < Math.floor(rating) ? '★' : '☆'}</span>
                        ))}
                    </div>
                    <span className="text-xs text-gray-400">({reviews})</span>
                </div>

                <Link to={`/product/${id}`}>
                    <h3 className="font-heading font-semibold text-navy text-lg mb-1 truncate group-hover:text-gold transition-colors">
                        {name}
                    </h3>
                </Link>

                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-navy">₹{price.toLocaleString()}</span>
                    {originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
