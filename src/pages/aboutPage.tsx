

const AboutPage = () => {
    return (
        <div className="bg-amber-200 py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-red-900 sm:text-5xl md:text-6xl">Welcome to BikeBD</h1>
          <p className="mt-4 text-lg font-semibold text-red-600">Your one-stop shop for all things cycling!</p>
        </div>
      
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-red-700 underline">Our Mission</h2>
            <p className="text-base text-gray-700">  
              At **BikeBD**, our mission is to offer top-quality bike products that enhance every rider's experience. We are committed to providing durable, innovative, and reliable bicycles, accessories, and gear that cater to cyclists of all levels. Our goal is to make cycling more enjoyable, efficient, and accessible for everyone.
            </p>
          </div>
      
        
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-red-700 underline">What We Offer</h2>
            <ul className="text-base text-gray-700 space-y-2">
              <li>- Wide Range of Bicycles (Road, Mountain, Hybrid, E-Bikes)</li>
              <li>- Expert Bike Repairs & Services</li>
              <li>- Cycling Accessories & Gear</li>
              <li>- Custom Bike Building</li>
              <li>- High-Performance Cycling Apparel</li>
            </ul>
          </div>
      
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-red-700 underline">Why Choose Us?</h2>
            <p className="text-base text-gray-700">
              Quality products, expert staff, personalized service, and affordable prices! We aim to make cycling accessible for everyone with our top-notch products and services.
            </p>
          </div>
        </div>
      
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-red-700 underline">Our Commitment to Sustainability</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            At BikeBD, we’re committed to reducing our carbon footprint and promoting a sustainable lifestyle by encouraging cycling as an eco-friendly alternative to transportation.
          </p>
        </div>
      
        <div className="mt-16 flex justify-center space-x-4">
          <a href="https://www.bikebd.com/showroom" className="lg:px-6 px-3 py-3 text-lg text-white bg-orange-600 rounded-lg font-semibold hover:bg-amber-900 transition-all duration-300">
            Visit Our Shop
          </a>
          <a href="https://www.bikebd.com/contact-us" className="px-6 py-3 text-lg text-orange-900 border-2 border-red-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all duration-300">
            Contact Us
          </a>
        </div>
       <div>
       <button className="mt-5 text-center"><a className="px-4 py-3 bg-red-900 text-white rounded-md" href="/">Back to HomePage</a></button>
       </div>
      </div>
      
    );
};

export default AboutPage;