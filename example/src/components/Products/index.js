import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../store";
import { setPaymentIntent } from "../../store/actions";
import { useHttpsCallable } from "../../hooks/useHttpsCallable";
import Form from "./Form";

const Products = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(AppContext);
  const { products, loadingProducts } = state;

  // create a callable verison of the createPaymentIntent cloud function
  const createPaymentIntent = useHttpsCallable("createPaymentIntent");

  const stripeLoading = useMemo(
    () => createPaymentIntent.loading,
    [createPaymentIntent]
  );
  const submitHandler = async (formData) => {
    // add up the product totals
    const amount = products.reduce(
      (total, product) => total + formData[product.title] * product.price,
      0
    );

    if (amount > 0) {
      // call the cloud function to create a new
      // Payment Intent with the calculated total
      const paymentIntent = await createPaymentIntent.call({
        amount: amount * 100,
      });
      dispatch(setPaymentIntent(paymentIntent));
      navigate("/checkout");
    }
  };

  return !products || loadingProducts ? (
    "Loading products..."
  ) : (
    <Form
      products={products}
      submitHandler={submitHandler}
      stripeLoading={stripeLoading}
    />
  );
};

export default Products;
