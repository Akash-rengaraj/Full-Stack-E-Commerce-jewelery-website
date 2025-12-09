import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gem, Award, Truck, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ValueProps = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    const features = [
        {
            icon: <Palette size={40} />,
            title: "Handcrafted",
            desc: "Every piece tells a unique story of artistry"
        },
        {
            icon: <Gem size={40} />,
            title: "Affordable Luxury",
            desc: "Premium quality at accessible prices"
        },
        {
            icon: <Award size={40} />,
            title: "Artisan Curated",
            desc: "Each design carefully selected for you"
        },
        {
            icon: <Truck size={40} />,
            title: "Fast Shipping",
            desc: "Delivered within 3-5 business days"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray('.value-item');

            // Staggered Entrance
            gsap.from(items, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });

            // Line Draw Animation
            if (lineRef.current) {
                const length = lineRef.current.getTotalLength();
                gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

                gsap.to(lineRef.current, {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                });
            }

            // Counter Animation (Simulated for "Happy Customers")
            const counterObj = { value: 0 };
            const counterEl = document.getElementById('customer-counter');

            if (counterEl) {
                gsap.to(counterObj, {
                    value: 10000,
                    duration: 2,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                    onUpdate: () => {
                        counterEl.innerText = Math.round(counterObj.value).toLocaleString() + "+";
                    }
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
            {/* Decorative Line (SVG) */}
            <div className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 pointer-events-none hidden lg:block opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 1200 100" preserveAspectRatio="none">
                    <path
                        ref={lineRef}
                        d="M0,50 Q300,0 600,50 T1200,50"
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="2"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">Why Sanjana Creations?</h2>
                    <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
                    <p className="mt-4 text-gold font-bold text-lg">
                        Join <span id="customer-counter">0</span> Happy Customers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="value-item text-center p-6 rounded-lg hover:bg-gold/5 transition-colors duration-300 group bg-white border border-transparent hover:border-gold/20 shadow-sm hover:shadow-lg">
                            <div className="w-20 h-20 mx-auto bg-navy/5 rounded-full flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-gold transition-all duration-500 transform group-hover:rotate-[360deg]">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueProps;
