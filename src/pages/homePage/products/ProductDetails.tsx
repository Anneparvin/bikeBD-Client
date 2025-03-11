
import { TBike } from "@/redux/features/bikeProduct/productSlice";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL params
  const [product, setProduct] = useState<TBike | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();




  useEffect(() => {
    if (!id) {
      setError("Product ID is missing");
      setLoading(false);
      return;
    }

    // Get token from local storage
    const token = (localStorage.getItem("accessToken") || "null");
    console.log("Token from storage:", token);

    // Check if token exists and is not expired
    if (!token) {
      setError("You are not authorized! Please log in.");
      setLoading(false);
      return;
    }

    const API_URL = `https://bike-shop-server-tau.vercel.app/api/v1/bike/${id}`;

    // Fetch product data from backend with authorization header
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("You are not authorized! Please log in.");
        }
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data.data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-lg font-bold">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!product) return <p className="text-center">No product found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={product.bikeImage} alt={product.name} className="w-full h-96 object-cover rounded shadow-md" />
      <h2 className="text-3xl font-bold mt-4">Name:  {product.name}</h2>
      <p className="text-gray-600">Brand: {product.brand} - {product.model}</p>
      <p className="text-gray-500">ProductType: {product.type}</p>
      <p className="text-gray-700 mt-2">Status: {product.status}</p>
      <p className="text-gray-700 mt-2">Stockl: {product.stock}</p>
      <p className="text-blue-500 font-bold text-xl mt-2">$Price{product.price}</p>
      <p className="text-blue-500 font-bold text-xl mt-2">${product.description}</p>
      <p className="text-blue-500 font-bold text-xl mt-2">${product.model}</p>

      <div className="mt-4 flex justify-center space-x-4">
        
        <button
          onClick={() => navigate(`/checkout/${product._id}`)}
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 w-full"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
