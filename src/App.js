import React, { useState, useEffect } from "react";
import "./App.css";
import { Products, NavBar } from "../src/components";
import { commerce } from "./lib/commerce";

function App() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    const { data } = response;
    setProduct(data);
  };

  console.log(product);

  return (
    <div>
      <NavBar />
      <Products products={product} />
    </div>
  );
}

export default App;
