
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "../../redux/features/auth/AuthSlice";
// import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { Link } from "react-router-dom";
 import CartSheet from "./cartSheet";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

//   const isCustomer = user && user.role === 'customer';

//   const cartItems = useAppSelector((state: RootState) => state.cart);

  const handleLogout = () => {
    const toastId = toast.loading("Logging out...");
    setTimeout(() => {
      dispatch(logout());
      toast.success("Logged out successfully", {id:toastId, duration:1500});
    },1500);
  };


  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-200 w-full px-6 italic">
      <div className="mx-auto flex justify-between items-center px-4 py-3 lg:px-8">
        {/* Left Side - Logo */}
        <div className="flex items-center">
          <div className="flex items-center" >
          <h2 className="font-extrabold hidden lg:block">BikeBD</h2>
          <img className="w-24 lg:w-32 h-12" src="https://i.ibb.co.com/9HvCNHGb/bike-Logo-removebg-preview.png" alt="Bike Logo" />

          </div>
          {/* Mobile Menu Button */}
          <button
            className="ml-3 p-2 text-orange-800 rounded lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

  <div className="flex justify-between items-center">
    {/* Center - Menu Items (Hidden on Mobile) */}
<ul className="hidden lg:flex space-x-6 font-bold">
  <li><a href="/" className="hover:text-orange-900">Home</a></li>
  <li><a href="/about" className="hover:text-orange-900">About</a></li>
  <li><a href="/order/verify" className="hover:text-orange-900">Order</a></li>
</ul>

{/* Conditional Rendering for Logged In Users */}
{
  user && (
    <ul className="hidden lg:flex space-x-6 font-bold ml-6">
      {/* Dashboard Link (Visible Only If User is Logged In) */}
      <li>
        <Link to={`/${user.role}/overview`} className="hover:text-blue-500 transition-colors duration-300 transform">
          Dashboard
        </Link>
      </li>
      
      {/* All Bike Link */}
      <li><a href="/all-bike" className="hover:text-orange-900">AllBike</a></li>
      
    
    </ul>
  )
}
  {user && <div className="hidden lg:block"><CartSheet /></div>}
  </div>




        {/* Right Side - Logout Button */}
        <div className="hidden lg:flex">
          {
            !user ?(
              <div>
              <Link to="/register">
              <button className="mr-3 px-4 py-2 bg-orange-800 text-white rounded-lg hover:bg-orange-400 transition">
              Sign Up

              </button>
              </Link>
              <Link to="/login">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-700 transition">
              Login

              </button>
              </Link>
              </div>
            ) : (
             <Link onClick={handleLogout} to="/">
               <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Log Out
                </button>
             </Link>

            )}
        </div>


      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md absolute w-full left-0 top-16 py-3 z-10">
          <ul className="flex flex-col items-center space-y-3 font-bold text-orange-800">
            <li><a href="/" className="py-2">Home</a></li>
            <li><a href="/all-bike" className="py-2">All Bike</a></li>
            <li><a href="/order/verify" className="py-2">Order</a></li>
            <li><a href="/about" className="py-2">About</a></li>
          </ul>
          <div className="text-center mt-3 italic">
          
            <Link onClick={handleLogout} to="/">
               <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Log Out
                </button>
             </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


