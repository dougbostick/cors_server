const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');


app.use(
  cors({
    origin: 'https://dougbostick.github.io',
  })
);

app.use(express.json());

app.get('/message', (req, res, next) => {
  res.send('message from express server!!!');
});

app.get('/getPlaces', async (req, res, next) => {
  try {
    const lat = req.query.lat;
    const lng = req.query.lng;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=500&type=restaurant&key=${process.env.REACT_APP_API_KEY}`
    );
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});

app.listen(6000, () => {
  console.log('server is listening on port 6000');
});
