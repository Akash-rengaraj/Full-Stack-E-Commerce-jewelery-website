interface CategoryCardProps {
    id: string;
    name: string;
    image: string;
    isSelected?: boolean;
    onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer group flex flex-col items-center gap-2 min-w-[100px] md:min-w-[120px] transition-all duration-300 ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
        >
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-all duration-300 ${isSelected ? 'border-gold shadow-lg' : 'border-transparent group-hover:border-gold/50'}`}>
                <img
                    src={image.startsWith('http') ? image : `http://localhost:5000${image}`}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <span className={`text-sm md:text-base font-medium text-center transition-colors ${isSelected ? 'text-gold font-bold' : 'text-navy group-hover:text-gold'}`}>
                {name}
            </span>
        </div>
    );
};

export default CategoryCard;
