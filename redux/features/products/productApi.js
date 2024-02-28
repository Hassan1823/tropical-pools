import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: (data) => ({
        url: `all-products`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    singleProduct: builder.mutation({
      query: (data) => ({
        url: "product-by-id",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    addToCart: builder.mutation({
      query: (data) => ({
        url: "add-to-cart",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    productsByName: builder.mutation({
      query: (data) => ({
        url: "product-by-name",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    reviewProduct: builder.mutation({
      query: (data) => ({
        url: `create-review`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    confirmOrder: builder.mutation({
      query: (data) => ({
        url: `confirm-order`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    allProductReviews: builder.query({
      query: (data) => ({
        url: `all-reviews`,
        method: "GET",
        credentials: "include",
      }),
    }),

    confirmOrders: builder.query({
      query: (data) => ({
        url: `all-orders`,
        method: "GET",
        credentials: "include",
      }),
    }),

    changeOrderStatus: builder.mutation({
      query: (data) => ({
        url: `change-status`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    deleteProduct: builder.mutation({
      query: (data) => ({
        url: "delete-product",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "create-product",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetProductsMutation,
  useSingleProductMutation,
  useAddToCartMutation,
  useProductsByNameMutation,
  useReviewProductMutation,
  useConfirmOrderMutation,
  useAllProductReviewsQuery,
  useConfirmOrdersQuery,
  useChangeOrderStatusMutation,
  useDeleteProductMutation,
  useAddProductMutation,
} = productApi;
