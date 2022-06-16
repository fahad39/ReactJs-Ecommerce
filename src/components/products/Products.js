import React from "react";
import Grid from "@mui/material/Grid";

import Product from "./Product/Product";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is product 1",
    price: "$10",
    image:
      "https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is product 2",
    price: "$120",
    image:
      "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
  },
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
