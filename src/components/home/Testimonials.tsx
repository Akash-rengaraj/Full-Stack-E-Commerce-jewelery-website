import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Wedding Customer",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
            text: "The jewelry I bought for my wedding was absolutely stunning. Everyone asked where I got it from! The quality is exceptional.",
            rating: 5
        },
        {
            name: "Anjali Gupta",
            role: "Regular Buyer",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
            text: "I love the modern yet traditional designs. Perfect for office wear and small functions. Highly recommended!",
            rating: 5
        },
        {
            name: "Meera Patel",
            role: "Fashion Enthusiast",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
            text: "Affordable luxury at its best. The packaging was beautiful and delivery was super fast. Will shop again.",
            rating: 4
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.testimonial-card');

            gsap.from(cards, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out"
            });

            // Parallax for quotes
            gsap.to('.bg-quote', {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-navy text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="bg-quote absolute -top-20 -left-20 transform -rotate-12">
                    <Quote size={400} className="text-gold" />
                </div>
                <div className="bg-quote absolute -bottom-20 -right-20 transform rotate-180">
                    <Quote size={400} className="text-gold" />
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-gold mb-4">Stories from Our Customers</h2>
                    <p className="text-gray-300">Read what our happy customers have to say</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className={`testimonial-card bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-gold/50 transition-all duration-300 group hover:-translate-y-2 ${index === 1 ? 'md:mt-12' : ''}`}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative overflow-hidden rounded-full w-16 h-16 border-2 border-gold group-hover:scale-110 transition-transform duration-500">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transform group-hover:rotate-12 transition-transform duration-700"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white group-hover:text-gold transition-colors">{item.name}</h4>
                                    <p className="text-sm text-gold/80">{item.role}</p>
                                </div>
                            </div>
                            <div className="mb-4 text-gold text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>{i < item.rating ? '★' : '☆'}</span>
                                ))}
                            </div>
                            <p className="text-gray-300 italic leading-relaxed">"{item.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
