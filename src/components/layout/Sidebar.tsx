
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
 import { customerPaths} from '../../routes/customer.routes';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '../../redux/features/auth/AuthSlice';
import { Layout, Menu } from 'antd';


const { Sider } = Layout;


const userRole = {
  ADMIN: 'admin',
   CUSTOMER: 'customer',
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log(user)
  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.CUSTOMER:
      sidebarItems = sidebarItemsGenerator(customerPaths, userRole.CUSTOMER);
      break;
   
    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: 'orange',
          height: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }} className='flex'
      >
        <h1>BikeBD</h1>
        <img className="w-24 lg:w-32 h-24 hidden lg:block" src="https://i.ibb.co.com/9HvCNHGb/bike-Logo-removebg-preview.png" alt="Bike Logo" />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={sidebarItems ?? []} 
      />
    </Sider>
  );
};

export default Sidebar;