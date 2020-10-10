let express = require("express");
let router = express.Router();
let order = require("../server/controllers/order");
var middleware = require("../server/middlewares");
var ensureAuthenticated = middleware.authMiddleware;

router.get(
  "/",
  ensureAuthenticated(["manager", "consumer"]),
  order.getAllOrders
);
router.get(
  "/entry/:id",
  ensureAuthenticated(["manager", "consumer"]),
  order.getOrderById
);
router.post("/", ensureAuthenticated(["manager"]), order.addOrder);
router.put("/:id", ensureAuthenticated(["manager"]), order.updateOrder);
router.delete("/:id", ensureAuthenticated(["manager"]), order.deleteOrder);
router.post("/search",ensureAuthenticated(["manager","consumer"]),order.getOrderByFilter)

module.exports = router;
