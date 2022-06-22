import React, { useState, useEffect } from "react";
import "./App.css";
import { Products, NavBar, Cart, Checkout } from "../src/components";
import { commerce } from "./lib/commerce";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./common/Routes";

function App() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    const { data } = response;
    setProduct(data);
  };

  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCart(response.cart);
  };

  const handleUpdateCart = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  return (
    <div>
      <NavBar totalItems={cart.total_items} />
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <Products products={product} onAddToCart={handleAddToCart} />
          }
        />
        <Route
          path={ROUTES.CART}
          element={
            <Cart
              cart={cart}
              handleUpdateCart={handleUpdateCart}
              handleRemoveCart={handleRemoveCart}
              handleEmptyCart={handleEmptyCart}
            />
          }
        />
        <Route path={ROUTES.CHECKOUT} element={<Checkout cart={cart} />} />
      </Routes>
    </div>
  );
}

export default App;
