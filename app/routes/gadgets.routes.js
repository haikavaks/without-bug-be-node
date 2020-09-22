const { authJwt } = require("../middlewares");
const controller = require("../controllers/gadget.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Product
  app.post('/api/v1/gadgets', [authJwt.verifyToken], controller.create);

  // Retrieve all Products
  app.get('/api/v1/gadgets', [authJwt.verifyToken], controller.findAll);

  // Retrieve a single Product with gadgetId
  app.get('/api/v1/gadgets/:gadgetId', [authJwt.verifyToken], controller.findOne);

  // Update a Note with gadgetId
  app.put('/api/v1/gadgets/:gadgetId', [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], controller.update);

  // Delete a Note with gadgetId
  app.delete('/api/v1/gadgets/:gadgetId', [authJwt.verifyToken, authJwt.isSuperAdminOrAdmin], controller.delete);
};
