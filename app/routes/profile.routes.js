const controller = require("../controllers/profile.controller");
const { authJwt } = require("../middlewares");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/profile",[authJwt.verifyToken], controller.getProfile);
  app.post("/api/v1/profile",[authJwt.verifyToken] ,controller.updateProfile);
  app.delete("/api/v1/profile", [authJwt.verifyToken], controller.deleteProfile);

};
