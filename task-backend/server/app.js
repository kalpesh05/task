const express = require("express");
const forEach = require("lodash/forEach");
const controller = require("./controller");
const { ensureAuthenticated } = require("./middleware/apiAuthentication");
const router = express.Router();

const routes = [
  /**
   * User routing
   */
  ["/api/login", controller.user.login],
  ["/api/logout", controller.user.logout],
  /**
   * Task action
   */
  ["/api/taskaction/:action", controller.task.taskaction, "api"]
];

forEach(routes, function(route) {
  var authMiddleware = function(req, res, next) {
    next();
  };

  const path = route[0];
  const destination = route[1];
  const verify = route[2] || false;

  switch (verify) {
    case "api":
      authMiddleware = ensureAuthenticated;
      break;
  }

  router.get(
    path,
    authMiddleware,
    destination.get || controller.errors.notFound
  );
  router.post(
    path,
    authMiddleware,
    destination.post || controller.errors.notFound
  );
  router.put(
    path,
    authMiddleware,
    destination.put || controller.errors.notFound
  );
  router.delete(
    path,
    authMiddleware,
    destination.delete || controller.errors.notFound
  );
});

module.exports = router;
