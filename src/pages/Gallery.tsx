import { useState } from 'react';
import { Filter as FilterIcon, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Filter from '../components/gallery/Filter';

const Gallery = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Dummy data
    const products = Array.from({ length: 12 }).map((_, i) => ({
        id: i.toString(),
        name: `Elegant Jewelry Piece ${i + 1}`,
        price: 1500 + (i * 100),
        originalPrice: 2000 + (i * 100),
        image: `https://source.unsplash.com/random/400x500?jewelry&sig=${i}`,
        rating: 4.5,
        reviews: 10 + i * 5,
        isNew: i % 3 === 0
    }));

    // Using specific images for better visual
    const productImages = [
        'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1935&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=1889&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1888&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1630019852942-f89202989a51?q=80&w=1938&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1617038224558-28ad3fb558a7?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1887&auto=format&fit=crop',
    ];

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
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Sort by:</span>
                        <select className="border-none bg-transparent font-bold text-navy focus:ring-0 cursor-pointer">
                            <option>Newest First</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Popularity</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filter */}
                    <Filter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    {...product}
                                    image={productImages[index % productImages.length]}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center gap-2">
                            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-navy transition-colors">1</button>
                            <button className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center">2</button>
                            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-navy transition-colors">3</button>
                            <span className="flex items-end px-2">...</span>
                            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-navy transition-colors">12</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
