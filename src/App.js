import React, { useState, useEffect } from "react";
import "./App.css";
import { Products, NavBar } from "../src/components";
import { commerce } from "./lib/commerce";

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

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  return (
    <div>
      <NavBar totalItems={cart.total_items} />
      <Products products={product} onAddToCart={handleAddToCart} />
    </div>
  );
}

export default App;
