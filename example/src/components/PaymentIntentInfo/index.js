import React, { useContext } from "react";
import { AppContext } from "../../store";
import styles from "./PaymentIntentInfo.module.css";

const PaymentIntentInfo = () => {
  const { state } = useContext(AppContext);
  const { paymentIntent } = state;
  return paymentIntent ? (
    <div className={styles.container}>
      <h3>
        Payment Intent{" "}
        <span className={styles[paymentIntent.message]}>
          {paymentIntent.message}
        </span>
      </h3>
      {paymentIntent.amount ? <div>${paymentIntent.amount / 100}</div> : ""}
    </div>
  ) : (
    ""
  );
};

export default PaymentIntentInfo;
