import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AppContext } from "../../store";
import Form from "./Form";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const { paymentIntent } = state;

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  // navigate to the products form if no Payment Intent exists
  useEffect(() => {
    if (!paymentIntent) {
      navigate("/");
    }
  }, [paymentIntent, navigate]);

  if (!paymentIntent) {
    return;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: paymentIntent?.clientSecret }}
    >
      <Form />
    </Elements>
  );
};

export default Checkout;
