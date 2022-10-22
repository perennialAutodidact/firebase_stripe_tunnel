# Listen for Stripe Events Locally Using the Firebase Functions Emulator

## Example Project

This example project demonstrates how to test Stripe webhooks with Firebase functions in a local environment using `localtunnel`.

Because this React app uses Firebase cloud functions, it requires an existing Firebase Project upgraded to the Blaze pay-as-you-go plan from Google.

The app will also require API keys from a Stripe account.

### Install Dependencies

```
$ npm install
```

### Configure Firebase

Create a file called `.env.local` in the `src` folder and add the values from your Firebase project using the variable names that are in `src/firebase/client.js` and also store the Stripe Publishable Key in a variable called `REACT_APP_STRIPE_PUBLISHABLE_KEY`. In the `functions` folder, create a file called `.env` and create environment variables:
- `NODE_ENV` - Either `DEVELOPMENT` for testing locally or `PRODUCTION` for the deployed app.
- `STRIPE_SECRET_KEY` - The Secret Key from your Stripe Account.
- `STRIPE_HANDLE_EVENT_SECRET_DEVELOPMENT` - The event signing secret provided by the Stripe CLI when `stripe listen` is run. This will change each time the user logs in to the Stripe CLI with `stripe login`
- `STRIPE_HANDLE_EVENT_SECRET_PRODUCTION` - If the app is deployed, this will be the webhook secret provided in the Stripe Dashboard when the webhook is created.

### Firebase Emulator

Log in to the Firebase CLI

```
$ firebase login
```

Run the functions emulator using your project name.

```
$ firebase emulators:start --only functions --project <YOUR_PROJECT_NAME>
```

### Run localtunnel

Run `localtunnel` through `npx`, specifying the port number the Firebase emulator is using for functions. 
```
$ npx localtunnel --port 5001
```

Copy the URL provided by `localtunnel`

### Run the Stripe CLI

Use the `--forward-to` flag to tell Stripe to send the triggered events to the Firebase function running on the emulator.

```
$ stripe listen --forward-to https://<LOCAL_TUNNEL_URL>.lt/<FIREBASE_PROJECT_NAME>/us-central1/handleStripeEvent
```

### Run the project

```
$ npm start
```

After starting the server, open a tab to the app [http://localhost:3000](`http://localhost:3000`) and a tab to the Firebase emulator console [http://localhost:4000/logs](`http://localhost:4000/logs`). The ports may vary based on your local configuration.

### Trigger Stripe Events

The product form will create and update Payment Intents and the checkout form will complete and cancel Payment Intents.

Check the emulator logs after each of the following:

1. Select at least one product and click "Submit".
3. Click "Cancel" from the checkout form.
4. Fill in the checkout form completely with card number `4242 4242 4242 4242`, and arbitrary values for the other fields. Click "Submit."

## Final Thoughts

This project is for demonstration purposes only. I'm sure there are plenty of bugs and other weirdness, feel free to submit pull requests. Thanks!
