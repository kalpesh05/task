const crypto = require("crypto");

exports.cryptoPassword = function(userSalt, password) {
  let salt = `${Math.round(new Date().valueOf() * Math.random())}`;
  if (userSalt) {
    salt = userSalt;
  }
  const cryptoPassword = crypto
    .createHmac("sha1", salt)
    .update(password)
    .digest("hex");
  return {
    salt,
    cryptoPassword
  };
};
