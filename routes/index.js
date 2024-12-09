const postRoutes = require("./post");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.send("Welcome to Photoverse!");
  });

  app.use("/api/posts", postRoutes); // Use the post routes under "/api/posts"
};
