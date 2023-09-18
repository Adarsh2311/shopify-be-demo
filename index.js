const express = require("express");
const app = express();
const axios = require("axios");
const port = 8082;
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// const accessToken = "shpua_dbaad03ccd78e3ca97a6d6a00dadc6e4";
// const apiUrl = `https://quickstart-e2bc3285.myshopify.com/admin/api/2023-07/graphql.json`;

app.options("*", cors());

app.post("/api/fetch-products", async (req, res) => {
  const { shop_domain, access_token } = req.body;
  if (!shop_domain || !access_token) {
    return res.status(400).json({ error: "missing body parameters" });
  }
  try {
    const query = `
      {
        products(first: 10) {
          edges {
            node {
              title
              id
            }
          }
        }
      }
    `;

    const response = await axios.post(
      `https://${shop_domain}/admin/api/2023-07/graphql.json`,
      { query },
      {
        headers: {
          "X-Shopify-Access-Token": access_token,
        },
      }
    );

    const products = response.data.data.products.edges;
    console.log(products, "Prod");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port 8082");
});
