require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3060;
const axios = require("axios");
const Dogs = "https://dog.ceo/api/breeds/image/random";

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static("public"));

// ALLOW CORS
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

// Routes
app.get("/", (req, res) => {
  axios
    .get(Dogs)
    .then(function(response) {
      // handle success
      // console.log(response);
      res.json(response.data.message);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
});

// app.get("/random", (req, res) => {
//   res.json(Dogs.getRandomDog());
// });

app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

module.exports = app;
