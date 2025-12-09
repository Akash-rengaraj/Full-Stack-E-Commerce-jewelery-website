import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterProps {
    isOpen: boolean;
    onClose: () => void;
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    materials: any[];
}

const Filter: React.FC<FilterProps> = ({ isOpen, onClose, priceRange, setPriceRange, materials }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        price: true,
        material: true,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:shadow-none lg:w-64 lg:block lg:border-r border-gray-100`}>
            <div className="h-full overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6 lg:hidden">
                    <h3 className="text-xl font-bold text-navy">Filters</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-navy">
                        <X size={24} />
                    </button>
                </div>

                {/* Price Range */}
                <div className="mb-6 border-b border-gray-100 pb-6">
                    <button
                        className="flex justify-between items-center w-full text-left font-bold text-navy mb-4"
                        onClick={() => toggleSection('price')}
                    >
                        <span>Price Range</span>
                        {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {expandedSections.price && (
                        <div className="space-y-4">
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                step="100"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
                            />
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>₹{priceRange[0]}</span>
                                <span>₹{priceRange[1]}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Material */}
                <div className="mb-6">
                    <button
                        className="flex justify-between items-center w-full text-left font-bold text-navy mb-4"
                        onClick={() => toggleSection('material')}
                    >
                        <span>Material</span>
                        {expandedSections.material ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {expandedSections.material && (
                        <div className="space-y-2">
                            {materials.map(mat => (
                                <label key={mat._id} className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                                    <span className="text-gray-600 group-hover:text-gold transition-colors">{mat.name}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Filter;
