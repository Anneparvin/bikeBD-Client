import { setProducts } from "@/redux/features/bikeProduct/productSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "./products/ProductCard";

const API_BASE_URL = "https://bike-shop-server-tau.vercel.app/api/v1/bike";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => dispatch(setProducts(data.data.product)))
       .then((data) => console.log(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [dispatch]);

  return (
    <div className="p-6 bg-orange-100">
        <h2 className="text-3xl font-bold mb-4 text-center underline">Featured Products</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
    {
       Array.isArray(products) && 
        products.slice(0,6).map((product) => (
            <ProductCard key={product._id} product={product} isFeatured={false}/>
            
        ))
    }
        </div>

        <div className="text-center mt-6">  
            <button className="bg-orange-400 font-bold text-white px-10 py-4 rounded hover:bg-orange-800" onClick={() => navigate("/all-bike")}>
            View All   
            </button>          
        </div>

    </div>
  );
};

  export default FeaturedProducts;





