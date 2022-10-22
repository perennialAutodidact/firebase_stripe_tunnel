import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../store";
import { setProducts, setLoadingProducts } from "../../store/actions";

const ProductsProvider = ({ children }) => {
  const { state, dispatch } = useContext(AppContext);
  const [status, setStatus] = useState("idle");
  const { products } = state;

  useEffect(() => {
    if (!products && status === "idle") {
      (async () => {
        setStatus("pending");
        dispatch(setLoadingProducts(true));
        try {
          const response = await fetch(
            "https://dummyjson.com/products?search=s&limit=3"
          );
          const data = await response.json();

          dispatch(setProducts(data.products));
          setStatus("success");
        } catch (error) {
          console.log(error);
          setStatus("fail");
        } finally {
          dispatch(setLoadingProducts(false));
        }
      })();
    }
  }, [products, status, dispatch]);

  return <>{children}</>;
};

export default ProductsProvider;
