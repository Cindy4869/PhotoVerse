var express = require("express"),
  mongoose = require("mongoose"),
  secrets = require("../config/secrets"),
  bodyParser = require("body-parser"),
  router = express.Router();

var app = express();

var port = process.env.PORT || 4000;

// mongoose
//   .connect(secrets.mongo_connection, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(secrets.mongo_connection);
  isConnected = true;
  console.log("Connected to MongoDB");
}

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

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

require("../routes")(app, router);

app.listen(port);
console.log("Server running on port " + port);

module.exports = app;
