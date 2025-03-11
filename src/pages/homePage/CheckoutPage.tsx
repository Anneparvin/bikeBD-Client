
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TBike } from "@/redux/features/bikeProduct/productSlice";


const CheckoutPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<TBike | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("SurjoPay");

  useEffect(() => {
    if (!id) return;
    fetch(`https://bike-shop-server-tau.vercel.app/api/v1/order/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data)
        console.log(data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  // Generate a random order ID (replace with actual logic)
  const generateOrderId = () => `NOK${Math.random().toString(36).substr(2, 9)}`;

  // Handle Order Submission
  const handleOrder = () => {
    if (quantity > product.stock) {
      alert("Quantity exceeds available stock!");
      return;
    }

    const orderData = {
      order_id: generateOrderId(),
      productId: product._id,
      quantity,
      totalPrice: product.price * quantity,
      paymentMethod,
    };

    fetch(`https://bike-shop-server-tau.vercel.app/api/v1/order?order_id=${orderData.order_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Order Placed Successfully!");
        navigate("/success");
        setProduct(data)
      })
      .catch((err) => console.error("Order failed:", err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="border p-4 rounded-lg">
        <img src={product.bikeImage} alt={product.name} className="w-32 h-32 object-cover rounded mb-4" />
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-600">Price: ${product.price}</p>
        <p className="text-gray-600">Stock: {product.stock} available</p>

        {/* Quantity Selector */}
        <div className="mt-4">
          <label className="block font-medium">Quantity:</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Payment Method */}
        <div className="mt-4">
          <label className="block font-medium">Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="SurjoPay">SurjoPay</option>
            <option value="Credit Card">Credit Card</option>
          </select>
        </div>

        {/* Total Price */}
        <p className="text-lg font-bold mt-4">Total: ${product.price * quantity}</p>

        {/* Order Now Button */}
        <button
          onClick={handleOrder}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 w-full"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;


