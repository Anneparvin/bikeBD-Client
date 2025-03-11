import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold text-green-600">Order Placed Successfully! ✅</h2>
      <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default SuccessPage;
