import React from "react";
import Grid from "@mui/material/Grid";

import Product from "./Product/Product";

const products = [
  { id: 1, name: "Product 1", description: "This is product 1", price: "$10" },
  { id: 2, name: "Product 2", description: "This is product 2", price: "$120" },
];

function Products() {
  return (
    <main>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Products;
