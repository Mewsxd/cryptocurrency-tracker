// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const newsHeaders = {
//   //   "X-RapidAPI-Key": "0173a24741msh96b83362ece6ed0p152485jsn9de054820b87",
//   //   "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
//   "X-RapidAPI-Key": "1adbc39d74msh5b43fcbf3f3d4c1p108295jsnad24e2ba0516",
//   "X-RapidAPI-Host": "investing4.p.rapidapi.com",
// };

// const createRequest = (url) => ({ url, headers: newsHeaders });
// const baseUrl = "https://investing4.p.rapidapi.com/";

// export const newsApi = createApi({
//   reducerPath: "newsApi",
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getNews: builder.query({
//       query: () => createRequest(`news/cryptocurrency-news`), // Define the queryFn here
//     }),
//   }),
// });

// export const { useGetNewsQuery } = newsApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsHeaders = {
  "X-RapidAPI-Key": "1adbc39d74msh5b43fcbf3f3d4c1p108295jsnad24e2ba0516",
  "X-RapidAPI-Host": "investing4.p.rapidapi.com",
};

// Update createRequest to accept additional parameters
const createRequest = (url) => ({ url, headers: newsHeaders });

const baseUrl = "https://investing4.p.rapidapi.com/";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      // Update the query function to accept a 'count' parameter
      query: () => createRequest(`news/cryptocurrency-news`),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
