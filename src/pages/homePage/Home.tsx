import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import Testimonials from "./Testimonials";


const Home = () => {
    return (
        <div>
        <Navbar/>  
         <Banner/>
       <FeaturedProducts />
         <Testimonials/>
          <Footer/>  
        </div>
    );
};

export default Home;