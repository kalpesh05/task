/**
 * Logout user post api
 */
const { LOGOUT_SUCCESS } = require("../../common/sucessMessages");

exports.get = function(req, res, next) {
  req.logout();

  res.json({ message: LOGOUT_SUCCESS });
};
