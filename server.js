var express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  secrets = require("./config/secrets"),
  bodyParser = require("body-parser");

var app = express();

var port = process.env.PORT || 4000;

mongoose
  .connect(secrets.mongo_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes")(app);

app.listen(port);
console.log("Server running on port " + port);
