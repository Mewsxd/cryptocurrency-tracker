import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createRequest = (url) => url;
const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest";

export const exchangeRateApi = createApi({
  reducerPath: "exchangeRateApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRates: builder.query({
      query: (code) => createRequest(`/currencies/${code}.json`),
    }),
  }),
});

export const { useGetRatesQuery } = exchangeRateApi;
