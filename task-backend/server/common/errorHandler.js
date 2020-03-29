const errorSend = function(error, req, res, next) {
  // Any request to this server will get here, and will send an HTTP
  if (typeof error.message != "undefined") {
    const messageArray = error.message.split("::");

    res.status(messageArray[0]).send({ error: messageArray[1] });
  }
};

exports.errorSend = errorSend;
