export const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAYMENT_INTENT":
      return {
        ...state,
        paymentIntent: action.payload.paymentIntent,
      };

    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
      };

    case "SET_LOADING_PRODUCTS":
      return {
        ...state,
        loadingProducts: action.payload.loadingProducts,
      };

    default:
      return state;
  }
};
