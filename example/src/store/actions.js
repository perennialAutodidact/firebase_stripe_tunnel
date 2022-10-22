export const setPaymentIntent = (paymentIntent) => ({
  type: "SET_PAYMENT_INTENT",
  payload: { paymentIntent },
});

export const setProducts = (products) => ({
  type: "SET_PRODUCTS",
  payload: { products },
});

export const setLoadingProducts = (loadingProducts) => ({
  type: "SET_LOADING_PRODUCTS",
  payload: { loadingProducts },
});
