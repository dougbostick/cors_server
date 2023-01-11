const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

console.log(process.env);


app.use(
  cors({
    origin: 'https://dougbostick.github.io',
  })
);

app.use(express.json());

app.get('/message', (req, res, next) => {
  res.send('message from express server');
});

app.post('/getPlaces', async (req, res, next) => {
  try {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const key = process.env.REACT_APP_API_KEY;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=500&type=restaurant&key=${key}`
    );
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});

app.listen(6000, () => {
  console.log('server is listening on port 6000');
});
