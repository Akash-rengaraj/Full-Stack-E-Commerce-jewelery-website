import { useState, useEffect } from 'react';
import { Star, StarOff, Search } from 'lucide-react';
import { getProducts } from '../../services/productService';
import api from '../../api/axios';

const FeaturedProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            console.log('Fetched products:', data);
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFeatured = async (id: string, currentStatus: boolean) => {
        console.log('Toggling featured for ID:', id, 'Current status:', currentStatus);
        try {
            // Optimistic update
            setProducts(products.map(p =>
                p._id === id ? { ...p, isFeatured: !currentStatus } : p
            ));

            await api.patch(`/products/${id}/featured`);
        } catch (error) {
            console.error('Failed to update featured status:', error);
            // Revert on error
            setProducts(products.map(p =>
                p._id === id ? { ...p, isFeatured: currentStatus } : p
            ));
            alert('Failed to update status');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-navy">Featured Products</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4 text-center">Featured</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        Loading products...
                                    </td>
                                </tr>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                                                    alt={product.name}
                                                    className="w-10 h-10 rounded object-cover border border-gray-200"
                                                />
                                                <span className="font-medium text-navy">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{product.category}</td>
                                        <td className="px-6 py-4 text-navy font-medium">₹{product.price}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => toggleFeatured(product._id, product.isFeatured)}
                                                className={`p-2 rounded-full transition-all ${product.isFeatured
                                                    ? 'bg-yellow-100 text-yellow-500 hover:bg-yellow-200'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                    }`}
                                                title={product.isFeatured ? "Remove from Featured" : "Add to Featured"}
                                            >
                                                {product.isFeatured ? <Star size={20} fill="currentColor" /> : <StarOff size={20} />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
