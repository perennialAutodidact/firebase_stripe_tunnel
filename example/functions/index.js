const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const admin = require("firebase-admin");

admin.initializeApp();

const { NODE_ENV } = process.env;
let stripeSigningSecretName = `STRIPE_HANDLE_EVENT_SECRET_${NODE_ENV}`;

let stripeSigningSecret = process.env[stripeSigningSecretName];

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const { amount } = data;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    // destructure desired values
    const { client_secret: clientSecret, id } = paymentIntent;

    return {
      id,
      clientSecret,
      amount,
      message: "Created",
    };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error);
  }
});

exports.cancelPaymentIntent = functions.https.onCall(async (data, context) => {
  const { id } = data;
  try {
    await stripe.paymentIntents.cancel(id);
    return { id, message: "Canceled" };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error);
  }
});

exports.handleStripeEvent = functions.https.onRequest((req, res) => {
  let signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      stripeSigningSecret
    );

    let paymentIntent = null;
    switch (event.type) {
      case "payment_intent.created":
        paymentIntent = event.data.object;
        functions.logger.log("Payment Intent Created", paymentIntent.id);
        break;
      case "payment_intent.succeeded":
        paymentIntent = event.data.object;
        functions.logger.log("Payment Intent Succeeded", paymentIntent.id);
        break;
      case "payment_intent.canceled":
        paymentIntent = event.data.object;
        functions.logger.log("Payment Intent Cancelled", paymentIntent.id);
        break;
      default:
        functions.logger.log("Unhandled event type", event.type);
        break;
    }
  } catch (error) {
    throw new functions.https.HttpsError(
      "unknown",
      `Error constructing Stripe event: ${error}`
    );
  }

  return res.send();
});
