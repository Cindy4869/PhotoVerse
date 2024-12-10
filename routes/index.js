module.exports = function (app, router) {
  require("./post.js")(router);
  // require('./tasks.js')(router);
  app.use("/api", router);
};
