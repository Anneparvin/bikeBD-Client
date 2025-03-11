import { Button } from "@/components/ui/button";
import { TBike } from "@/redux/features/bikeProduct/productSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: TBike;
  isFeatured?: boolean; 
}

export const ProductCard = ({product, isFeatured = true}: ProductCardProps) => {
  console.log(product)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,       
        product: product.name,  // ✅ Now passing name instead of whole object
        bikeImage: product.bikeImage,  
        brand: product.brand,   
        description: product.description,  
        name: product.name,   
        price: product.price,   
        model: product.model,  
        stock: 1,               // Adding 1 item initially
        status: product.status,  
        type: product.type    
      })
    );
  };
  


  return (
    <div className="border rounded-lg p-4 shadow-md">
    <img src={product?.bikeImage} alt="BikeImage" className="w-full h-40 object-contain rounded bg-gray-300" />
    <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
    <p className="text-gray-600">{product.brand} - {product.model}</p>
    <p className="text-blue-500 font-bold">${product.price}</p>

      {isFeatured ? null : (
        <div>

              <button
                className="px-8 py-3 bg-red-500 rounded font-bold"
                onClick={() => navigate(`bike/${product._id}`)}
              >
                View Details
              </button>
               <div className="mt-6 flex bg-red-300">
               <Button onClick={() => handleAddToCart()} className="w-full">
                 <ShoppingCart className="w-5 h-5 mr-2" />
                 Add to Cart
               </Button>
             </div>
        </div>
            )}
  </div>
  );
};

