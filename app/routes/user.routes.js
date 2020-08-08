const controller = require("../controllers/user.controller");
const controllerRole = require("../controllers/roles.controller");
const { authJwt } = require("../middlewares");
const express = require('express')
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/resources/roles", controllerRole.roles);
  app.get("/api/v1/test/all", controller.allAccess);

  app.get("/api/v1/test/qa", [authJwt.verifyToken], controller.qaBoard);

  app.get("/api/v1/test/companyBoard", [authJwt.verifyToken, authJwt.isCompany], controller.companyBoard);

  app.get("/api/v1/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
  app.get("/api/v1/test/superAdmin", [authJwt.verifyToken, authJwt.isSuperAdmin], controller.superAdminBoard);
};
