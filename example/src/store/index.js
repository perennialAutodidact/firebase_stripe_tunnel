import { createContext } from "react";

// const fetchProducts = async () => {
//   try {
//     const response = await fetch(
//       "https://dummyjson.com/products?search=s&limit=3"
//     );
//     const data = await response.json();
//     return data.products;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const setInitialState = async () => {
//   const products = await fetchProducts();
//   return {
//     products,
//     paymentIntent: null,
//   };
// };

// export const initialState = setInitialState();
export const initialState = {
  paymentIntent: null,
  products: null,
  loadingProducts: false,
};

export const AppContext = createContext(initialState);
