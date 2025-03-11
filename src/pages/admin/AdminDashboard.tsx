// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     const decodedToken = JSON.parse(atob(token.split('.')[1]));
//     if (decodedToken.role !== 'admin') {
//       navigate('/unauthorized'); // Redirect if user is not admin
//     } else {
//       setIsAdmin(true);
//     }
//   }, [navigate]);

//   return (
//     isAdmin && (
//       <div>
//         <h1>Admin Dashboard</h1>
//         {/* Render Admin Dashboard Components */}
//         <button onClick={() => navigate('/admin/products')}>Manage Products</button>
//         <button onClick={() => navigate('/admin/users')}>Manage Users</button>
//         <button onClick={() => navigate('/admin/orders')}>Manage Orders</button>
//       </div>
//     )
//   );
// };

// export default AdminDashboard;
