import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-navy text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-heading font-bold text-gold mb-6">SANJANA CREATIONS</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            "Beautiful Things at Affordable Price." We bring you handcrafted elegance that tells a story.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gold">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Shop', 'About Us', 'Contact', 'Blog'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-gray-300 hover:text-gold transition-colors flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gold">Customer Care</h4>
                        <ul className="space-y-3">
                            {['FAQ', 'Shipping Policy', 'Returns & Exchanges', 'Privacy Policy', 'Terms of Service'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-gray-300 hover:text-gold transition-colors flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gold">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-300">
                                <MapPin className="text-gold shrink-0 mt-1" size={20} />
                                <span>123 Jewelry Lane, Fashion District, Mumbai, India 400001</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <Phone className="text-gold shrink-0" size={20} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <Mail className="text-gold shrink-0" size={20} />
                                <span>hello@sanjanacreations.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Sanjana Creations. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-gold">Privacy</a>
                        <a href="#" className="hover:text-gold">Terms</a>
                        <a href="#" className="hover:text-gold">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
