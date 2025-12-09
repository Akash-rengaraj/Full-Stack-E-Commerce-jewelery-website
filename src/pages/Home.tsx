import Hero from '../components/home/Hero';
import ValueProps from '../components/home/ValueProps';
import FeaturedCollections from '../components/home/FeaturedCollections';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

const Home = () => {
    return (
        <div className="overflow-hidden">
            <Hero />
            <ValueProps />
            <FeaturedCollections />
            <Testimonials />
            <CTA />
        </div>
    );
};

export default Home;
