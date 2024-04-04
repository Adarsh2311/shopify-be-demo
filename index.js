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

    let data = JSON.stringify({
      query: `mutation {
      webPixelCreate(webPixel: { settings: "" }) {
        userErrors {
          code
          field
          message
        }
        webPixel {
          settings
          id
        }
      }
    }`,
      variables: {}
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://live2-ai.myshopify.com/admin/api/2024-04/graphql.json',
      headers: {
        'X-Shopify-Access-Token': 'shpua_f308717044fbcfef794487f58c7dae45',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..6H3uPAk34AIWTUX9.dXiY_p_xFbpmESmqAqKBd6qS1msIrw67YBFtdjtawO12AF0r9HD6rcMHElAheDamGalo7M2mF1DouYwkpDvSezXQXUSGeFrFOhQXSmsVPYB8hwFbIrPoO22OdoCyjZ54eha2Um0NZkLxgatdiq-rKniQauG4ajsPK9oyrFqnluZHsOmXzzvlTKGwGkgLrVJBTfbdWWygylRXGhM5IijTXLwcCvOI1xjVUA.d1a3pM4T0n21XqhWBI1XgA'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    res.status(200).json({ message: 'Pixel Api' })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to run Pixel" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port 8082");
});
