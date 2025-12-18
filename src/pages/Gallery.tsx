import { useState, useEffect } from 'react';
import { Filter as FilterIcon, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Filter from '../components/gallery/Filter';
import { getProducts } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { getMaterials } from '../services/materialService';
import { useCartStore } from '../store/cartStore';

const Gallery = () => {
    const { addToCart } = useCartStore();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // ... existing state ...


    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [materials, setMaterials] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // Filter & Sort State
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [priceRange, setPriceRange] = useState([0, 10000]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData, materialsData] = await Promise.all([
                    getProducts(),
                    getCategories(),
                    getMaterials()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
                setMaterials(materialsData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter Logic
    const filteredProducts = products.filter(product => {
        // Category Filter
        if (selectedCategory && product.category !== selectedCategory) return false;

        // Search Filter
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;

        // Price Filter
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

        return true;
    });

    // Sort Logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low-high') return a.price - b.price;
        if (sortBy === 'price-high-low') return b.price - a.price;
        if (sortBy === 'popularity') return b.rating - a.rating; // Assuming rating is a proxy for popularity
        // Default: Newest (assuming higher ID or created date is newer, but here we might just rely on order or add a date field)
        return 0;
    });

    // Pagination Logic
    const itemsPerPage = 9;
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-cream min-h-screen">
            {/* Header */}
            <div className="bg-navy text-white py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Collections</h1>
                    <p className="text-gray-300">Discover our exquisite range of handcrafted jewelry.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Categories Scroll */}
                {categories.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold text-navy mb-6">Shop by Category</h2>
                        <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
                            <div
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setCurrentPage(1);
                                }}
                                className={`cursor-pointer group flex flex-col items-center gap-2 min-w-[100px] md:min-w-[120px] transition-all duration-300 ${!selectedCategory ? 'scale-105' : 'hover:scale-105'}`}
                            >
                                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 flex items-center justify-center bg-white transition-all duration-300 ${!selectedCategory ? 'border-gold shadow-lg' : 'border-transparent group-hover:border-gold/50'}`}>
                                    <span className="text-xs font-bold text-navy">ALL</span>
                                </div>
                                <span className={`text-sm md:text-base font-medium text-center transition-colors ${!selectedCategory ? 'text-gold font-bold' : 'text-navy group-hover:text-gold'}`}>
                                    All
                                </span>
                            </div>
                            {categories.map((cat) => (
                                <CategoryCard
                                    key={cat._id}
                                    id={cat._id}
                                    name={cat.name}
                                    image={cat.image}
                                    isSelected={selectedCategory === cat.name}
                                    onClick={() => {
                                        setSelectedCategory(cat.name);
                                        setCurrentPage(1);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">
                    <button
                        className="lg:hidden flex items-center gap-2 text-navy font-bold"
                        onClick={() => setIsFilterOpen(true)}
                    >
                        <FilterIcon size={20} /> Filters
                    </button>

                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search for jewelry..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Sort by:</span>
                        <select
                            className="border-none bg-transparent font-bold text-navy focus:ring-0 cursor-pointer"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="popularity">Popularity</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filter */}
                    <Filter
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        materials={materials}
                    />

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
                            </div>
                        ) : currentItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentItems.map((product) => (
                                    <ProductCard
                                        key={product._id || product.id}
                                        {...product}
                                        onAddToCart={() => addToCart({
                                            id: product._id || product.id,
                                            name: product.name,
                                            price: product.price,
                                            image: product.image,
                                            quantity: 1,
                                            size: 'Standard',
                                            color: 'Default'
                                        })}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                <p>No products found in this category.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentPage === number
                                            ? 'bg-navy text-white'
                                            : 'border border-gray-300 hover:bg-gold hover:border-gold hover:text-navy'
                                            }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
