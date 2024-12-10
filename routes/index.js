module.exports = function (app, router) {
  require("./post.js")(router);
  // require('./tasks.js')(router);
  require("./auth.js")(router)
  app.use("/api", router);
};
