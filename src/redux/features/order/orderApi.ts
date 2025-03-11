import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder :builder.mutation({
            query:(userInfo) => ({
                url:"/order",
                method:"POST",
                body:userInfo,
            }),
        }),

         // create add order API
         addOrder: builder.mutation({
            query: (data) => ({
                url: '/order/create-order',
                method: 'POST',
                body: data,
            }),
        }),
        getAllOrder:builder.query({
            query:() => "/order",
        }),
        verifyPayment:builder.query({
            query:(order_id) => ({
                url: "/order/verify",
                params: { order_id },
                method: "GET",  
            }),
        }),
        updateOrder: builder.mutation({
            query: ({ id, updateData }) => ({
                url: `/order/${id}`,
                method: "PATCH",
                body: updateData,
            }),
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/order/${id}`,
                method: "DELETE",
            }),
        }),

        // Get orders for the logged-in user
        getMeOrder: builder.query({
            query: () => ({
                url: "/order/me",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useAddOrderMutation,
    useGetAllOrderQuery,
    useGetMeOrderQuery,
    useVerifyPaymentQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
  } = orderApi;
  