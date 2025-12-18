import { Link } from 'react-router-dom';
import { Award, Heart, Leaf, Users } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop"
                        alt="Jewellery Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/50 backdrop-blur-[2px]"></div>
                </div>
                <div className="relative z-10 text-center px-4 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 tracking-wider">
                        Adorning You
                    </h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto">
                        Exquisite covering jewellery and handcrafted masterpieces that define elegance.
                    </p>
                </div>
            </section>

            {/* Brand Story Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-heading font-bold text-navy">
                            The Art of <span className="text-gold">Ornamentation</span>
                        </h2>
                        <p className="text-charcoal/80 leading-relaxed text-lg">
                            Sanjana Creations began with a simple vision: to make the grandeur of traditional jewellery accessible to everyone. We specialize in high-quality covering jewellery that mirrors the brilliance of real gold, alongside unique, handcrafted pieces that tell a story of their own.
                        </p>
                        <p className="text-charcoal/80 leading-relaxed text-lg">
                            From intricate temple designs to contemporary chic, our collections are curated to add that perfect sparkle to your special moments. We believe that every piece of jewellery is not just an accessory, but a reflection of your inner radiance.
                        </p>
                        <div className="pt-4">
                            <img
                                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop"
                                alt="Signature"
                                className="h-16 opacity-80"
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 border-2 border-gold/30 rounded-lg transform rotate-3"></div>
                        <img
                            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop"
                            alt="Handcrafted Jewellery"
                            className="relative rounded-lg shadow-xl w-full h-[500px] object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
                            Our <span className="text-gold">Promise</span>
                        </h2>
                        <p className="text-charcoal/60 max-w-2xl mx-auto">
                            What makes Sanjana Creations the preferred choice for jewellery lovers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Award size={40} />,
                                title: "Premium Finish",
                                desc: "High-quality gold plating that offers a long-lasting, authentic look."
                            },
                            {
                                icon: <Heart size={40} />,
                                title: "Handcrafted Detail",
                                desc: "Unique designs meticulously crafted by skilled artisans."
                            },
                            {
                                icon: <Leaf size={40} />,
                                title: "Skin Friendly",
                                desc: "Materials chosen with care to be safe and comfortable for all skin types."
                            },
                            {
                                icon: <Users size={40} />,
                                title: "Customer Love",
                                desc: "Thousands of happy customers who trust us for their special occasions."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-cream p-8 rounded-xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md group">
                                <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6 text-navy group-hover:bg-navy group-hover:text-gold transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-heading font-bold text-navy mb-3">{item.title}</h3>
                                <p className="text-charcoal/70 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Team / Artisans */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
                        The <span className="text-gold">Artisans</span>
                    </h2>
                    <p className="text-charcoal/60 max-w-2xl mx-auto">
                        The hands that weave magic into metal and stone.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Sanjana R.",
                            role: "Founder & Curator",
                            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                        },
                        {
                            name: "Rajesh K.",
                            role: "Master Goldsmith",
                            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                        },
                        {
                            name: "Priya M.",
                            role: "Jewellery Designer",
                            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                        }
                    ].map((member, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-2xl font-heading font-bold text-white">{member.name}</h3>
                                <p className="text-gold font-medium">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-navy py-20 text-center px-4">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                    Find Your <span className="text-gold">Sparkle</span>
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
                    Explore our exclusive collection of covering and handcrafted jewellery.
                </p>
                <Link
                    to="/shop"
                    className="inline-block bg-gold text-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-navy transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    View Collections
                </Link>
            </section>
        </div>
    );
};

export default About;
