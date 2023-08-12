import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeader = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "1adbc39d74msh5b43fcbf3f3d4c1p108295jsnad24e2ba0516",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "bing-news-search1.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: cryptoNewsHeader });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (newsCategory) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day`
        ), // Define the queryFn here
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
