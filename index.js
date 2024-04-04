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

app.post("/api/create-pixel", async (req, res) => {
  try {
    var graphql = JSON.stringify({
      query: "mutation {\n  webPixelCreate(webPixel: { settings: \"{\\\"accountID\\\":\\\"234\\\"}\" }) {\n    userErrors {\n      code\n      field\n      message\n    }\n    webPixel {\n      settings\n      id\n    }\n  }\n}\n",
      variables: {}
    })

    const response = await fetch('https://live2-ai.myshopify.com/admin/api/2021-10/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': 'shpua_f308717044fbcfef794487f58c7dae45',
      },
      body: graphql,
    });

    const responseData = await response.json();
    console.log(responseData, "App Pixel Api ")
    res.status(200).json({ message: 'Pixel Api' });
    // const products = response.data.data.products.edges;
    // console.log(products, "Prod");
    // res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to run Pixel" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port 8082");
});
