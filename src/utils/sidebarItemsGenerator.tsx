
// import { TSidebarItem, TUserPath } from '@/pages/types';
// import { NavLink } from 'react-router-dom';

// export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
//   const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }

//     return acc;
//   }, []);

//   return sidebarItems;
// };

import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { TUserPath } from "@/pages/types";

// Define the correct type for sidebar items
type SidebarMenuItem = NonNullable<MenuProps["items"]>[number];  

export const sidebarItemsGenerator = (items: TUserPath[], role: string): SidebarMenuItem[] => {
  if (!items || items.length === 0) return []; 

  return items.map((item) => ({
    key: item.name,
    label: item.children ? item.name : <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
    children: item.children?.map((child) => ({
      key: child.name,
      label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
    })),
  }));
};

