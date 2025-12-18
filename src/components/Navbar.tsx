import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const cartItemsCount = useCartStore(state => state.items.length);
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            // This useEffect was for isScrolled, which is now removed.
            // Keeping it empty or removing it if no other scroll logic is needed.
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Collections', path: '/collections' },
        { name: 'Shop', path: '/shop' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md py-2`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-gold font-bold text-xl group-hover:scale-110 transition-transform">
                            S
                        </div>
                        <span className={`font-heading font-bold text-xl tracking-wide text-navy`}>
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
                        <Link to="/cart" className="relative p-2 hover:text-gold transition-colors">
                            <ShoppingCart size={24} />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gold text-navy text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <Link to="/account" className="p-2 hover:text-gold transition-colors flex items-center gap-2" title="My Account">
                                <User size={24} />
                                <span className="hidden lg:inline text-sm font-medium">{user?.name.split(' ')[0]}</span>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-sm font-medium hover:text-gold transition-colors">Login</Link>
                                <Link to="/signup" className="bg-gold text-navy px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-500 transition-colors">
                                    Sign Up
                                </Link>
                            </div>
                        )}
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
