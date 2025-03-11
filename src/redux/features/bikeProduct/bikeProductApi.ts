import { baseApi } from "@/redux/api/baseApi";

const bikeProductApi =baseApi.injectEndpoints({
    endpoints:(builder) => ({
        createProduct:builder.mutation({
            query:(userInfo) => ({
                url: "/bike/create-bike",
                method: "POST",
                body: userInfo,
            }),
        }),

        getAllProducts:builder.query({
            query:() => "/bike",
        }),

        getProductById: builder.query({
            query: (id) => `/bike/${id}`, 
          }),

        
        updateProduct: builder.mutation({
            query: ({ id, updateData }) => ({
                url: `/bike/${id}`, 
                method: "PATCH",
                body: updateData,
            }),
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/bike/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const{ useCreateProductMutation,useGetAllProductsQuery,useGetProductByIdQuery,useUpdateProductMutation,useDeleteProductMutation} = bikeProductApi;

