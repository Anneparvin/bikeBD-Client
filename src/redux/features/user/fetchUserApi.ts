export const fetchUserProfile = async () => {
    const response = await fetch('https://bike-shop-server-tau.vercel.app/api/v1/user/profile', {
      method: 'GET',
      headers: {
        Authorization: `${localStorage.getItem('token')}`, 
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching profile');
    }
    return response.json();
  };
  
  export const fetchUserOrders = async () => {
    const response = await fetch('https://bike-shop-server-tau.vercel.app/api/v1/user/order', {
      method: 'GET',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching orders');
    }
    return response.json();
  };
  
  export const updatePassword = async (currentPassword: string, newPassword: string) => {
    const response = await fetch('https://bike-shop-server-tau.vercel.app/api/v1/user/change-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
    if (!response.ok) {
      throw new Error('Error updating password');
    }
    return response.json();
  };
  