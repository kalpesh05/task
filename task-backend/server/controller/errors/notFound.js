module.exports = function(req, res, next) {
  res.status(404).send({
    error: "Route does not exist for this request"
  });
};
