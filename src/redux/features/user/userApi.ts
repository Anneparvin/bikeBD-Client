import { baseApi } from "@/redux/api/baseApi";


export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/user/login",
        method: "POST",
        body: payload,
      }),
    }),
    logoutUser: builder.mutation({
      query: (token) => ({
        url: "/user/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

     // Get all users API
     getAllUsers: builder.query({
        query: () => ({
          url: "/user",
          method: "GET",
        }),
        providesTags: ["User"],
      }),

      // Get all users
    getUsers: builder.query({
      query: () => '/user',
    }),

    // Get a single user by ID
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
    }),

     // Update an existing user
     updateUser: builder.mutation({
      query: (user) => ({
        url: `/user/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
    }),


      // delete user
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `/user/${id}`, // Delete user by ID
          method: 'DELETE',
        }),
      }),


     // Get me user API
     getMeUser: builder.query({
      query: () => ({
          url: '/user/me',
          method: 'GET',
      }),
  }),


  // Password Changed API
  passwordChangedUser: builder.mutation({
      query: ({ userEmail, body }) => ({
          url: `/user/passwordchange/${userEmail}`,
          method: 'PATCH',
          body,
      }),
      invalidatesTags: ['User']
  }),
  }),
});

export const { useRegisterUserMutation,
   useLoginUserMutation, 
   useLogoutUserMutation,
   useGetAllUsersQuery,
  useGetMeUserQuery,
  usePasswordChangedUserMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
 } = userApi;
