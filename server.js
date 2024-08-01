const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5",
      {
        params: {
          lat: 28.6145,
          lng: 77.3063,
          "is-seo-homepage-enabled": true,
          page_type: "DESKTOP_WEB_LISTING",
        },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          Referer: "https://www.swiggy.com/",
          Origin: "https://www.swiggy.com",
          Connection: "keep-alive",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from Swiggy" });
  }
});

// New endpoint to fetch menu details for a specific restaurant
app.get("/api/menu/:id", async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.61450&lng=77.30630&restaurantId=${restaurantId}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          Referer: "https://www.swiggy.com/",
          Origin: "https://www.swiggy.com",
          Connection: "keep-alive",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching menu data from Swiggy" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
