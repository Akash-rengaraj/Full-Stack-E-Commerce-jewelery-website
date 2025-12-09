import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, User } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Collections', path: '/collections' },
        { name: 'About', path: '/about' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-gold font-bold text-xl group-hover:scale-110 transition-transform">
                            S
                        </div>
                        <span className={`font-heading font-bold text-xl tracking-wide ${isScrolled ? 'text-navy' : 'text-navy'}`}>
                            SANJANA<span className="text-gold">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-semibold tracking-wide transition-colors hover:text-gold ${isActive(link.path) ? 'text-gold' : 'text-navy'}`}
                            >
                                {link.name.toUpperCase()}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="text-navy hover:text-gold transition-colors">
                            <Search size={20} />
                        </button>
                        <Link to="/wishlist" className="text-navy hover:text-gold transition-colors">
                            <Heart size={20} />
                        </Link>
                        <Link to="/cart" className="text-navy hover:text-gold transition-colors relative">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-2 -right-2 bg-gold text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>
                        <Button variant="primary" size="sm" className="ml-2">
                            Login
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-navy" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-4 animate-fade-in">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-base font-semibold py-2 border-b border-gray-100 ${isActive(link.path) ? 'text-gold' : 'text-navy'}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex gap-4 mt-2 justify-center">
                        <Link to="/wishlist" className="p-2 bg-gray-100 rounded-full text-navy">
                            <Heart size={20} />
                        </Link>
                        <Link to="/cart" className="p-2 bg-gray-100 rounded-full text-navy relative">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-1 -right-1 bg-gold text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>
                        <Link to="/profile" className="p-2 bg-gray-100 rounded-full text-navy">
                            <User size={20} />
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
