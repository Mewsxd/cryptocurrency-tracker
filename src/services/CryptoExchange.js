// "https://api.coingecko.com/api/v3/exchanges"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createRequest = (url) => url;
const baseUrl = "https://api.coingecko.com";
// https://api.coingecko.com/api/v3/exchanges/gdax/volume_chart?days=30
export const cryptoExchange = createApi({
  reducerPath: "cryptoExchange",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoExchange: builder.query({
      query: () => createRequest(`/api/v3/exchanges`), // Define the queryFn here
    }),
    getExchangeHistory: builder.query({
      query: (coinId) =>
        createRequest(`/api/v3/exchanges/${coinId}/volume_chart?days=7`),
    }),
  }),
});

export const { useGetCryptoExchangeQuery, useGetExchangeHistoryQuery } =
  cryptoExchange;
