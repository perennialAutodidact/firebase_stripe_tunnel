import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AppContext, initialState } from "./store";
import { appReducer } from "./store/reducer";
import ProductsProvider from "./components/Products/Provider";
import Navbar from "./components/Navbar";
import PaymentIntentInfo from "./components/PaymentIntentInfo";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import ThankYou from "./components/ThankYou";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ProductsProvider>
        <div className="App">
          <main className="container">
            <Navbar />
            <PaymentIntentInfo />
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
          </main>
        </div>
      </ProductsProvider>
    </AppContext.Provider>
  );
}

export default App;
