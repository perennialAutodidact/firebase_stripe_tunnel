import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { AppContext } from "../../store";
import { setPaymentIntent } from "../../store/actions";
import styles from "./Checkout.module.css";
import { useHttpsCallable } from "../../hooks/useHttpsCallable";

const Form = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { paymentIntent } = state;
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    setLoading(false);

    if (error) {
      setError(error);
    } else {
      dispatch(setPaymentIntent(null));
      navigate("/thank-you");
    }
  };

  const cancelPaymentIntent = useHttpsCallable("cancelPaymentIntent");

  const handleCancel = async (e) => {
    try {
      const response = await cancelPaymentIntent.call({
        id: paymentIntent?.id,
      });
      dispatch(setPaymentIntent(response));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      {error ? <p className={styles.error}>{error.message}</p> : ""}
      <PaymentElement />
      <button disabled={!stripe || loading} className={styles.submitButton}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      <Link to="/" onClick={handleCancel} className={styles.cancelLink}>
        Cancel
      </Link>
    </form>
  );
};

export default Form;
