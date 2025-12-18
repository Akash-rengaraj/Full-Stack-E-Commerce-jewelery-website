import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import CTAModal from './CTAModal';

const Layout = () => {
    const [isCTAOpen, setIsCTAOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <main className="flex-grow pt-20">
                <Outlet />
            </main>
            <Footer />

            {/* Floating CTA Button */}
            <button
                onClick={() => setIsCTAOpen(true)}
                className="fixed bottom-8 right-8 z-40 bg-navy text-gold p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 border-2 border-gold animate-bounce-slow"
                title="Request Callback"
            >
                <Phone size={24} fill="currentColor" />
            </button>

            <CTAModal isOpen={isCTAOpen} onClose={() => setIsCTAOpen(false)} />
        </div>
    );
};

export default Layout;
