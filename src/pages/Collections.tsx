import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import { getCategories } from '../services/categoryService';

const Collections = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
            </div>
        );
    }

    return (
        <div className="bg-cream min-h-screen pt-20">
            {/* Header */}
            <div className="bg-navy text-white py-16 mb-12">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Curated Collections</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Explore our handpicked selections, organized by category for your browsing pleasure.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 pb-20 space-y-20">
                {categories.map((category) => {
                    const categoryProducts = products.filter(p => p.category === category.name).slice(0, 4);

                    if (categoryProducts.length === 0) return null;

                    return (
                        <section key={category._id} className="animate-fade-in">
                            <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                                <div>
                                    <h2 className="text-3xl font-heading font-bold text-navy">{category.name}</h2>
                                    <p className="text-gray-600 mt-1">{category.description || `Explore our ${category.name} collection`}</p>
                                </div>
                                <Link
                                    to={`/shop?category=${category.name}`}
                                    className="flex items-center gap-2 text-gold font-bold hover:text-navy transition-colors"
                                >
                                    View All <ArrowRight size={20} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {categoryProducts.map((product) => (
                                    <ProductCard key={product._id || product.id} {...product} />
                                ))}
                            </div>
                        </section>
                    );
                })}

                {categories.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>No collections found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Collections;
