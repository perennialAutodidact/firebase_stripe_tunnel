import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import styles from "./Products.module.css";

const Form = ({ submitHandler, products, stripeLoading }) => {
  // set initial value to zero for each product
  const initialValues = useMemo(
    () =>
      !products
        ? {}
        : Object.keys(products).reduce((obj, title) => {
            obj[title] = 0;
            return obj;
          }, {}),
    [products]
  );

  const { register, handleSubmit } = useForm({ initialValues });

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      {products.map((product) => (
        <div className={styles.productField}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.thumbnail}
          />
          <div className={styles.productInfo}>
            <div>{product.title}</div>
            <div>${product.price}</div>
          </div>
          <input type="text" {...register(product.title)} />
        </div>
      ))}
      <button disabled={stripeLoading} className={styles.submitButton}>
        {stripeLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Form;
