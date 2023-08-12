import { cryptoApi } from "../services/CryptoApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { cryptoNewsApi } from "../services/CryptoNewsApi";
import { newsApi } from "../services/NewsApi";
import { exchangeRateApi } from "../services/getExchangeRate";
import { cryptoExchange } from "../services/CryptoExchange";

const { configureStore, createSlice } = require("@reduxjs/toolkit");

const exchangeRate = createSlice({
  name: "exchange-rate",
  initialState: { exchangeRate: 1, currencyCode: "usd" },
  reducers: {
    changeCurrency(state, action) {
      state.exchangeRate = action.payload.rate;
    },
    changeCurrencyCode(state, action) {
      state.currencyCode = action.payload.code;
    },
  },
});
const store = configureStore({
  reducer: {
    exchangeRate: exchangeRate.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [exchangeRateApi.reducerPath]: exchangeRateApi.reducer,
    [cryptoExchange.reducerPath]: cryptoExchange.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware)
      .concat(newsApi.middleware)
      .concat(exchangeRateApi.middleware)
      .concat(cryptoExchange.middleware),
});

setupListeners(store.dispatch);
export const exchangeRateActions = exchangeRate.actions;
export default store;
