import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Button from '../Button';
import heroimg from '../../assets/images/heros/home-hero.png'

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const ornamentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance Animation
            const tl = gsap.timeline();

            tl.from(ornamentRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.out',
            })
                .from(textRef.current?.querySelectorAll('.stagger-text') || [], {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                }, '-=1.0');

            // Light Reflex (Shine) Animation
            gsap.to(shineRef.current, {
                x: '200%',
                duration: 2.5,
                repeat: -1,
                repeatDelay: 3,
                ease: 'power1.inOut',
            });

            // Particles Animation
            gsap.utils.toArray('.particle').forEach((particle: any) => {
                gsap.to(particle, {
                    y: `-${Math.random() * 100 + 50}`,
                    x: `${Math.random() * 50 - 25}`,
                    rotation: Math.random() * 360,
                    duration: Math.random() * 3 + 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: Math.random() * 2,
                });
            });

            // Mouse movement parallax
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 30; // Increased range
                const y = (clientY / window.innerHeight - 0.5) * 30;

                gsap.to(ornamentRef.current, {
                    x: x,
                    y: y,
                    rotationY: x * 0.5, // Slight 3D rotation
                    rotationX: -y * 0.5,
                    duration: 1,
                    ease: 'power2.out',
                });

                // Parallax for background elements
                gsap.to('.bg-element', {
                    x: x * -0.5,
                    y: y * -0.5,
                    duration: 1.5,
                    ease: 'power2.out',
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-[#00152e] to-navy text-white pt-20 perspective-1000">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="bg-element absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
                <div className="bg-element absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy/50 rounded-full blur-3xl"></div>

                {/* Particles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="particle absolute rounded-full bg-gold/30 blur-[1px]"
                        style={{
                            width: Math.random() * 6 + 2 + 'px',
                            height: Math.random() * 6 + 2 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                        }}
                    ></div>
                ))}
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div ref={textRef} className="text-center md:text-left">
                    <h2 className="stagger-text text-gold font-heading font-bold text-lg tracking-widest mb-4 uppercase">
                        Sanjana Creations
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6">
                        <span className="stagger-text inline-block">Beautiful Things</span> <br />
                        <span className="stagger-text inline-block">at </span>{' '}
                        <span className="stagger-text inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange">
                            Affordable Price
                        </span>
                    </h1>
                    <p className="stagger-text text-gray-300 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Discover our handcrafted collection of elegant ornaments designed to make you shine without breaking the bank.
                    </p>
                    <div className="stagger-text flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Button variant="primary" size="lg" to="/shop">
                            Explore Collection
                        </Button>
                        <Button variant="outline" size="lg" to="/about">
                            Our Story
                        </Button>
                    </div>
                </div>

                {/* Hero Image / Ornament */}
                <div className="relative flex justify-center items-center perspective-1000">
                    <div ref={ornamentRef} className="relative w-full max-w-[500px] aspect-square transform-style-3d">
                        {/* Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/20 rounded-full blur-3xl animate-pulse"></div>

                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src={heroimg}
                                alt="Luxury Gold Necklace"
                                className="w-full h-full object-contain drop-shadow-2xl filter contrast-125"
                            />
                            {/* Shine Effect Overlay */}
                            <div
                                ref={shineRef}
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full pointer-events-none mix-blend-overlay"
                            ></div>
                        </div>

                        {/* Sparkles */}
                        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-gold rounded-full animate-ping delay-300"></div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gold/50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
