import { useState, useEffect } from 'react';
import Button from '../Button';

const CTA = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 32,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 bg-gold/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 group hover:shadow-2xl transition-shadow duration-500">
                    <div className="p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>

                        <span className="text-orange font-bold tracking-wider mb-2 animate-pulse">LIMITED TIME OFFER</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6 relative z-10">
                            Subscribe & Get <span className="text-gold">15% OFF</span>
                        </h2>
                        <p className="text-gray-600 mb-8 relative z-10">
                            Join our exclusive newsletter to receive the latest updates, style tips, and special offers directly to your inbox.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-grow px-6 py-3 rounded border border-gray-300 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all duration-300"
                            />
                            <Button variant="primary" className="hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-gold/50">
                                Subscribe
                            </Button>
                        </div>

                        <div className="flex gap-4 md:gap-8 relative z-10">
                            {Object.entries(timeLeft).map(([unit, value]) => (
                                <div key={unit} className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-navy font-mono bg-gray-100 rounded-lg p-2 min-w-[60px]">
                                        {String(value).padStart(2, '0')}
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide mt-2">{unit}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-64 md:h-auto bg-navy overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1915&auto=format&fit=crop"
                            alt="Jewelry Collection"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy/50 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
