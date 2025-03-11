
// import { Layout} from 'antd';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import { logout } from '@/redux/features/auth/AuthSlice';
// import { useAppDispatch } from '@/redux/hooks';
// import { Button } from 'antd/es/radio';


// const { Header, Content, Footer} = Layout;

// const MainLayout = () => {
//   const dispatch = useAppDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//   };
//     return (
//        <div>
//          <Layout style={{height:"100vh"}}>
//          <Sidebar/>
//          <Header>
//           <Button onClick={handleLogout}>Logout</Button>{' '}
//         </Header>
//           <Layout>
//             <Header style={{ padding: 0}} />
//             <Content style={{ margin: '24px 16px 0' }}>
//               <div
//                 style={{
//                   padding: 24,
//                   minHeight: 360,
//                 }}
//               >
//                 <Outlet/>
//               </div>
//             </Content>
//             <Footer style={{ textAlign: 'center' }}>
//               Bike Design ©{new Date().getFullYear()} Created by Bangladesh BikeBD
//             </Footer>
//           </Layout>
//         </Layout>
//        </div>
//       );
//     };
    

// export default MainLayout;



import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IoHome } from "react-icons/io5";

import { RootState } from "@/redux/store";
import { adminPaths } from "@/routes/admin.routes";
import { customerPaths } from "@/routes/customer.routes";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "../ui/button";
import { logout } from "@/redux/features/auth/AuthSlice";


const MainLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role;
  const email = user?.userId



const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };


  const pathsToRender = userRole === 'admin' ? adminPaths : userRole === 'customer' ? customerPaths : [];
  // console.log(pathsToRender);


  const navigate = useNavigate();

  return (
      <div className="flex h-screen justify-center">
          <Sidebar>
              <SidebarContent>
                  <SidebarGroup>
                      <SidebarGroupLabel className="mt-2 mb-6 text-2xl text-center flex justify-center items-center hover:bg-blue-100">
                          <div className="p-2 ">
                              <Link to="/" className="flex justify-center items-center gap-1"><span><IoHome /></span>BikeBD</Link>
                              <div className="text-black text-sm underline">{email}</div>
                              
                          </div>
                      </SidebarGroupLabel>
                      <SidebarGroupContent>
                          <SidebarMenu>
                              {pathsToRender.map((item) => (
                                  <SidebarMenuItem key={item.path}>
                                      <SidebarMenuButton onClick={() => navigate(`/${userRole}/${item.path}`)}>
                                          <div className="text-lg flex items-center gap-2">
                                              <div>{item.icons}</div>
                                              <div>
                                                  {item.name}
                                              </div>
                                          </div>
                                      </SidebarMenuButton>
                                  </SidebarMenuItem>
                              ))}
                          </SidebarMenu>
                      </SidebarGroupContent>
                  </SidebarGroup>
              </SidebarContent>
          </Sidebar>
          <main className=" p-4 flex">
              <Outlet />
          </main>
          
          <Button onClick={handleLogout}>Logout</Button>{' '}
        <div>
        <button
  onClick={() => window.location.href = '/'}
  className="flex ml-8 items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-house-door mr-2"
    viewBox="0 0 16 16"
  >
    <path d="M8 3.293l4 4V13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7.293l-7-7-7 7V13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7.293l4-4z"/>
  </svg>
  Back to Home
</button>

        </div>
      </div>
  );
};

export default MainLayout;
