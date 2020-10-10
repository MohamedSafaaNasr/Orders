const express = require("express");
const router = express.Router();
const userController = require("../server/controllers/users");
const middleware = require("../server/middlewares");
const ensureAuthenticated = middleware.authMiddleware;

router.post("/authenticate", userController.authenticate);

router.post("/", userController.createUser);

router.get("/verify/", userController.checkVerification);

/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

router.post("/register", userController.createUser);

router.get(
  "/get_user",
  ensureAuthenticated(["manager", "consumer"]),
  userController.getUserByToken
);

router.get("/verify", userController.checkVerification);

router.post("/reset_password", userController.resetPassword);

router.get("/reset/:reset_token", userController.checkResetToken);

router.post("/forget_password", userController.forgetPassword);

router.get("/", ensureAuthenticated(["manager"]), userController.getAllUsers);

router.get(
  "/profile",
  ensureAuthenticated(["manager", "consumer"]),
  userController.getUserProfile
);

router.get(
  "/entry/:id",
  ensureAuthenticated(["manager"]),
  userController.getUserByID
);

router.put(
  "/:id",
  ensureAuthenticated(["manager", "consumer"]),
  userController.editUser
);

router.delete(
  "/:id",
  ensureAuthenticated(["manager"]),
  userController.deleteUser
);

module.exports = router;
